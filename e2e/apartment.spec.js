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

test("visited city markers show Sanity visit dates", async ({ page }, testInfo) => {
  await page.route("**/*.apicdn.sanity.io/**", (route) =>
    route.fulfill({
      json: {
        result: {
          contentModel: "dynamic-v1",
          visitedCities: [
            {
              _id: "vancouver",
              name: "Vancouver",
              month: 7,
              year: 2023,
              location: { lat: 49.2827, lng: -123.1207 },
            },
            {
              _id: "paris",
              name: "Paris",
              month: 5,
              year: 2024,
              location: { lat: 48.8566, lng: 2.3522 },
            },
          ],
        },
      },
    })
  );
  await page.goto("/?room=travel");
  const marker = page.getByRole("button", { name: "Vancouver, July 2023" });
  await marker.click();
  await expect(page.getByRole("tooltip")).toContainText("July 2023");
  await marker.hover();
  await expect(page.getByRole("tooltip")).toContainText("Vancouver");
  await expect(page.getByRole("tooltip")).toContainText("July 2023");
  await page.screenshot({ path: testInfo.outputPath("visited-map.png"), fullPage: true });
  await page.getByRole("button", { name: "Paris, May 2024" }).focus();
  await expect(page.getByRole("tooltip")).toContainText("May 2024");
  const summary = page.locator(".visited-city-list summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".visited-city-list li")).toHaveCount(2);
  await expect(page.locator(".visited-city-list")).toContainText("July 2023");
});

test("every dialog fits, traps focus, and closes in day and night mode", async ({
  page,
}, testInfo) => {
  const rooms = [
    "books",
    "travel",
    "projects",
    "speaker",
    "music",
    "photos",
    "berkeley",
    "portrait",
    "resume",
  ];
  for (const night of [false, true]) {
    await page.goto("/");
    if (night) await page.getByRole("button", { name: "Switch to nighttime" }).click();
    for (const room of rooms) {
      await page.goto(`/?room=${room}`);
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("heading", { level: 2 })).toBeVisible();
      expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
        true
      );
      await expect(
        page.getByRole("button", { name: "Back to the apartment", exact: true })
      ).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(page.getByRole("button", { name: "Explore the next object" })).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Back to the apartment", exact: true })
      ).toBeFocused();
      if (room === "berkeley") {
        await expect(dialog.locator(".education-institution h3")).toHaveCSS(
          "color",
          "rgb(52, 61, 49)"
        );
      }
      await page.screenshot({
        path: testInfo.outputPath(`${night ? "night" : "day"}-${room}.png`),
      });
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    }
  }
});

test("directory empty state recovers and not-found page returns home", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Browse all corners" }).click();
  await page.getByRole("searchbox").fill("no-such-corner");
  await expect(page.getByText("No corners found.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "show every room" }).click();
  await expect(page.locator(".directory-grid button")).toHaveCount(8);
  await page.getByRole("button", { name: "Close room directory" }).click();
  await expect(page.getByRole("button", { name: "Browse all corners" })).toBeFocused();
  await page.goto("/not-a-real-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("There’s nothing");
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Make yourself");
});

test("long CMS content and populated galleries fit a 320px viewport", async ({ page }) => {
  const long = "A long published title ".repeat(8);
  await page.setViewportSize({ width: 320, height: 740 });
  await page.route("**/*.apicdn.sanity.io/**", (route) =>
    route.fulfill({
      json: {
        result: {
          contentModel: "dynamic-v1",
          educations: [{ _id: "school", institutionLabel: long, degree: long, years: "2020–2023" }],
          experiences: [
            { _id: "work", company: long, title: long, date: "2024–Present", note: long },
          ],
          nonfictionBooks: [
            { _id: "book", title: long, author: long, imageUrl: "/assets/Sorting-Wall.png" },
          ],
          apartmentProjects: [
            { _id: "project", name: long, text: long, image: "/assets/Sorting-Wall.png" },
          ],
          photographyPhotos: [
            {
              _key: "photo",
              imageUrl: "/assets/Profile-Picture.png",
              alt: "Portrait fixture",
              caption: long,
              location: long,
            },
          ],
          topSongsByYear: [
            {
              year: 2025,
              songs: [{ title: long, artist: long, spotifyUrl: "https://open.spotify.com/" }],
            },
          ],
        },
      },
    })
  );
  for (const room of ["books", "projects", "photos", "speaker", "berkeley", "resume"]) {
    await page.goto(`/?room=${room}`);
    await expect(page.getByRole("dialog")).toContainText(long.trim());
    expect(
      await page
        .getByRole("dialog")
        .evaluate((element) => element.scrollWidth <= element.clientWidth)
    ).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  }
});

test("record selection, volume, and failed audio recovery work", async ({ page }) => {
  await page.route("**/audio/bossa-antigua.mp3", (route) => route.abort());
  await page.goto("/?room=music");
  await page.getByRole("button", { name: "Play Bossa Antigua", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("couldn’t");
  await page.getByRole("button", { name: "Select Jazz Brunch" }).click();
  await page.getByRole("button", { name: "Play Jazz Brunch", exact: true }).click();
  await expect(page.getByRole("button", { name: "Pause Jazz Brunch", exact: true })).toBeVisible();
  await page.getByRole("slider", { name: "Volume" }).fill("35");
  expect(await page.locator("audio").evaluate((audio) => audio.volume)).toBe(0.35);
  await page.getByRole("button", { name: "Pause Jazz Brunch", exact: true }).click();
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

test("motion controls, reduced motion, and cat interactions work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator(".window-clouds path").first()).toHaveCSS(
    "animation-play-state",
    "paused"
  );
  await page.getByRole("button", { name: "Resume animations" }).click();
  await expect(page.locator(".window-clouds path").first()).toHaveCSS(
    "animation-play-state",
    "running"
  );
  await page.getByRole("button", { name: "Pet the cat. Sleeping." }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Pet the cat. Surprised." })).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".window-clouds path").first()).toHaveCSS("animation-name", "none");
});

test("every scene hotspot opens its dialog and next navigation cycles", async ({ page }) => {
  const objects = [
    ["books", "Explore books I like"],
    ["travel", "Explore travel logs and favorite places"],
    ["projects", "Explore things built for fun"],
    ["speaker", "Explore music and dance"],
    ["music", "Explore the record player — choose café jazz"],
    ["photos", "Explore photos"],
    ["berkeley", "Explore education"],
    ["portrait", "Explore portrait"],
    ["resume", "Explore résumé"],
  ];
  await page.goto("/");
  for (const [id, name] of objects) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`room=${id}`));
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Back to the apartment", exact: true }).click();
  }
  await page.getByRole("button", { name: "Explore books I like" }).click();
  for (const id of [
    "travel",
    "projects",
    "speaker",
    "photos",
    "berkeley",
    "portrait",
    "resume",
    "books",
  ]) {
    await page.getByRole("button", { name: "Explore the next object" }).click();
    await expect(page).toHaveURL(new RegExp(`room=${id}`));
    await expect(
      page.getByRole("button", { name: "Back to the apartment", exact: true })
    ).toBeFocused();
  }
  await page.locator(".panel-backdrop").click({ position: { x: 2, y: 2 } });
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
