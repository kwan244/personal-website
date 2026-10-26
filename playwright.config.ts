import { defineConfig, devices } from "@playwright/test";

// Smoke tests against the production build (`npm run build` first); a port of its own so `npm run dev` can keep 3000.
export default defineConfig({
  testDir: "tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:3100", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start -- -p 3100",
    url: "http://localhost:3100",
    // Always a fresh server: a leftover one keeps serving the previous build, whose pages point at script files
    // a rebuild replaced, so interactive tests fail for no real reason. Now it's a clear "port in use" error.
    reuseExistingServer: false,
  },
});
