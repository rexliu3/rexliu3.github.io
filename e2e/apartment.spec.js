import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*.apicdn.sanity.io/**", (route) => route.abort());
});

test("the apartment works offline from the CMS and fits the viewport", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Make yourself at home." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Beyond the welcome mat." })).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
  await page.getByRole("button", { name: "Start with an intro" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Start with an intro" })).toBeFocused();
  expect(errors).toEqual([]);
});

test("search, room URLs, and browser history stay in sync", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Browse all corners" }).click();
  await page.getByRole("searchbox", { name: "Find a room" }).fill("résumé");
  await page
    .getByRole("region", { name: "What brings you in?" })
    .getByRole("button", { name: "Résumé The résumé" })
    .click();
  await expect(page).toHaveURL(/\?room=resume/);
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goForward();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "The work so far." })).toBeVisible();
  await page.getByRole("button", { name: "Back to the apartment", exact: true }).click();
  await expect(page).not.toHaveURL(/room=/);
});

test("day/night preference survives a reload", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to nighttime" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Switch to daytime" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await page.screenshot({ path: testInfo.outputPath("night.png"), fullPage: true });
});

test("clicking the window toggles weather without opening a popup", async ({ page }, testInfo) => {
  await page.goto("/");
  const window = page.getByRole("button", { name: "Toggle weather" });
  await window.click();
  await expect(window).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".window-rain")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("rain.png"), fullPage: true });
  await window.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".window-rain")).toHaveCount(0);
  await expect(page.locator(".window-clouds")).toBeVisible();
});

test("keyboard users can skip the scene and explore every corner", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to apartment navigation" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Browse all corners" })).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const books = page
    .getByRole("region", { name: "What brings you in?" })
    .getByRole("button", { name: "Books The bookshelf" });
  await expect(books).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Between the covers." })).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Explore the next object" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(books).toBeFocused();
});

test("jazz starts on demand and pauses from the scene controls", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Play café jazz" }).click();
  await expect(page.getByRole("button", { name: "Pause café jazz" })).toBeVisible();
  await expect(page.locator(".room-record")).toContainText("Bossa Antigua");
  await page.getByRole("button", { name: "Pause café jazz" }).click();
  await expect(page.getByRole("button", { name: "Play café jazz" })).toBeVisible();
});
