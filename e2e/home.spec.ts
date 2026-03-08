import { test, expect } from "@playwright/test";

test("homepage should load and display title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Unidone/);
});

test("homepage should contain main content", async ({ page }) => {
  await page.goto("/");
  const body = page.locator("body");
  await expect(body).toBeVisible();
});
