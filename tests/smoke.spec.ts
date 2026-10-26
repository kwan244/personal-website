import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Desktop Chrome is 1280 × 720, wider than 16:10, so the notes lie on the desk.

// In both themes, with reduced motion: otherwise the scroll reveals leave most of the page at opacity 0, and
// axe skips invisible text. Reloaded so no colour is mid-transition when the theme changes.
async function expectNoAxeViolations(page: Page) {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    await page.reload();
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    const found = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`);
    expect(found, `${colorScheme} theme`).toEqual([]);
  }
}

// The case studies, read off the project cards so the tests follow projects.ts.
async function caseStudies(page: Page) {
  await page.goto("/");
  const hrefs = await page.locator("#projects h3 a").evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
  expect(hrefs.length).toBeGreaterThan(0);
  return hrefs;
}

test("home page loads with no accessibility violations", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectNoAxeViolations(page);
});

test("every note links to a project card that exists", async ({ page }) => {
  await page.goto("/");
  const targets = await page
    .locator('a[href^="#project-"]')
    .evaluateAll((notes) => notes.map((a) => a.getAttribute("href")!));
  // Each project has a desk note and a note in the phone list.
  expect(targets.length).toBe(2 * (await page.locator("#projects h3 a").count()));
  for (const target of targets) await expect(page.locator(target)).toHaveCount(1);
});

test("every case study renders with no accessibility violations", async ({ page }) => {
  for (const href of await caseStudies(page)) {
    const response = await page.goto(href);
    expect(response?.status(), href).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoAxeViolations(page);
  }
});

test("no sideways scroll at 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  for (const href of ["/", ...(await caseStudies(page))]) {
    await page.goto(href);
    // globals.css clips sideways overflow on html and body, which would hide (not fix) anything too wide.
    await page.addStyleTag({ content: "html, body { overflow-x: visible !important; }" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow, href).toBeLessThanOrEqual(0);
  }
});

test("clicking a desk note flies to its card, and Back returns to the hero", async ({ page }) => {
  await page.goto("/");
  const note = page.locator(".desk-note a").first();
  const target = (await note.getAttribute("href"))!;
  await note.click();
  await expect(page.locator(`${target} h3 a`)).toBeFocused();
  await expect(page).toHaveURL(new RegExp(`${target}$`));
  await page.goBack();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

// A mouse's second click lands on the scrolled page, but the note keeps focus until the flight ends.
test("pressing Enter twice on a note starts one flight", async ({ page }) => {
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    (window as unknown as { flights: number }).flights = 0;
    document.startViewTransition = (update) => {
      (window as unknown as { flights: number }).flights++;
      return start(update);
    };
  });
  await page.goto("/");
  await page.locator(".desk-note a").first().focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(page.locator('[id^="project-"] h3 a').first()).toBeFocused();
  expect(await page.evaluate(() => (window as unknown as { flights: number }).flights)).toBe(1);
});

test("the phone menu opens, and Escape closes it and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu" });
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-nav").getByRole("link", { name: "Projects" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(button).toBeFocused();
});

test("a case study's sticky facts stay below the header", async ({ page }) => {
  for (const href of await caseStudies(page)) {
    await page.goto(href);
    // Where the aside sticks, against the sticky header's height (Desktop Chrome is wide enough to stick it).
    const [stickAt, header] = await page.evaluate(() => [
      parseFloat(getComputedStyle(document.querySelector('[aria-label="At a glance"]')!).top),
      document.querySelector("header")!.offsetHeight,
    ]);
    expect(stickAt, href).toBeGreaterThanOrEqual(header);
  }
});

test("going Back mid-flight leaves focus at the hero", async ({ page }) => {
  await page.goto("/");
  await page.locator(".desk-note a").first().click();
  // Back once the flight has recorded its history entry, while the note is still in the air.
  await expect(page).toHaveURL(/#project-/);
  expect(await page.evaluate(() => "noteFlight" in document.documentElement.dataset)).toBe(true);
  await page.goBack();
  await expect.poll(() => page.evaluate(() => "noteFlight" in document.documentElement.dataset)).toBe(false);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  expect(await page.evaluate(() => document.activeElement?.closest('[id^="project-"]') ?? null)).toBeNull();
});

test("turning on reduced motion mid-visit stops the parallax", async ({ page }) => {
  await page.goto("/");
  const shift = () =>
    page.evaluate(() => document.querySelector<HTMLElement>(".desk-box")!.style.getPropertyValue("--mx"));
  await page.mouse.move(100, 200);
  await page.mouse.move(150, 250);
  await expect.poll(shift).not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(shift).toBe("");
  await page.mouse.move(1000, 400);
  await page.waitForTimeout(300);
  expect(await shift()).toBe("");
});

test("Contact jumps to the footer on the current page", async ({ page }) => {
  const [href] = await caseStudies(page);
  await page.goto(href);
  await page.locator("header nav").getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(new RegExp(`${href}#contact$`));
  await expect(page.getByRole("heading", { name: "Good things begin with a conversation." })).toBeInViewport();
});

test("Contact is marked at the bottom of a tall screen", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const nav = page.locator("header nav").first();
  await page.waitForTimeout(200);
  await expect(nav.locator('[aria-current="true"]')).toHaveCount(0);
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "true");
  await page.evaluate(() => document.getElementById("projects")!.scrollIntoView());
  await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "true");
});

test("the theme toggle overrides the system theme and is remembered", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Dark theme" });
  const background = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await background()).toBe("rgb(10, 13, 12)");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(await background()).toBe("rgb(246, 251, 248)");
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  expect(await background()).toBe("rgb(246, 251, 248)");
});

test("a saved theme is applied before the page body is parsed", async ({ page }) => {
  const html = await (await page.request.get("/")).text();
  const script = html.indexOf('localStorage.getItem("theme")');
  expect(script).toBeGreaterThan(0);
  expect(script).toBeLessThan(html.indexOf("<body"));
});

test("every page has a link preview image that loads", async ({ page }) => {
  for (const href of ["/", ...(await caseStudies(page))]) {
    await page.goto(href);
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image, href).toBeTruthy();
    // The tag holds the deployed URL; fetch the same path from this server.
    const response = await page.request.get(new URL(image!).pathname);
    expect(response.status(), href).toBe(200);
    expect(response.headers()["content-type"], href).toBe("image/png");
  }
});

test("unknown pages and case studies return a real 404 with the site's page", async ({ page }) => {
  for (const href of ["/no-such-page", "/projects/no-such-project"]) {
    const response = await page.goto(href);
    expect(response?.status(), href).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to the home page" })).toHaveAttribute("href", "/");
  }
  await expectNoAxeViolations(page);
});

test("encoded links to real case studies still load, and malformed ones are rejected", async ({ page }) => {
  for (const [href, title] of [
    ["/projects/%70lateful", "Plateful"],
    ["/projects/rock%2Dpaper-scissors", "Rock Paper Scissors"],
  ]) {
    const response = await page.goto(href);
    expect(response?.status(), href).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
  }
  // Rejected, not crashed: this server gives the 404 page, Vercel's edge answers 400 before the app runs.
  const malformed = await page.goto("/projects/%E0%A4%A");
  expect([400, 404]).toContain(malformed?.status());
});

test("link names include their visible text, for voice control", async ({ page }) => {
  for (const href of ["/", (await caseStudies(page))[0]]) {
    await page.goto(href);
    await expect(page.getByRole("link", { name: "Kevin Wang — home" })).toBeVisible();
    // Off by default in axe (it's marked experimental), so run it on its own.
    const { violations } = await new AxeBuilder({ page }).withRules(["label-content-name-mismatch"]).analyze();
    expect(
      violations.map((v) => v.nodes.map((n) => n.target).join(", ")),
      href,
    ).toEqual([]);
  }
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Creativity sparks, greatness in progress: see my projects" }),
  ).toBeVisible();
});

test("the phone menu closes when the KW link goes home", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/projects/plateful");
  const button = page.getByRole("button", { name: "Menu" });
  await button.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.getByRole("link", { name: "Kevin Wang — home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});
