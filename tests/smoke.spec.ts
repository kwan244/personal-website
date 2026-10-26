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
