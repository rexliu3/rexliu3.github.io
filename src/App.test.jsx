import React from "react";
import { cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import App from "./App";
import ApartmentPage from "./pages/ApartmentPage";
import fallbackContent from "./sanity/fallbackContent";
import { getContentRooms } from "./components/apartment/rooms";

const originalFetch = global.fetch;

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
});

afterEach(() => {
  cleanup();
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

test("renders bundled content immediately while the CMS is still pending", () => {
  global.fetch = vi.fn().mockReturnValue(new Promise(() => {}));
  const view = render(<App />);
  expect(view.getByRole("heading", { name: "Make yourself at home." })).toBeTruthy();
  fireEvent.click(view.getByRole("button", { name: "Start with an intro" }));
  expect(view.getByRole("dialog")).toBeTruthy();
});

test("a rejected content request still opens every room and restores keyboard focus", async () => {
  global.fetch = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const view = render(<App />);
  await waitFor(() => expect(view.getByText("Make yourself")).toBeTruthy());
  fireEvent.click(view.getByRole("button", { name: "Browse all corners" }));

  for (const room of fallbackContent.rooms) {
    const trigger =
      room.content === false
        ? view.getByLabelText("Explore the record player — choose café jazz")
        : within(view.getByRole("region", { name: "What brings you in?" })).getByRole("button", {
            name: `${room.short} ${room.name}`,
          });
    trigger.focus();
    fireEvent.click(trigger);
    expect(view.getByRole("dialog")).toBeTruthy();
    expect(
      within(view.getByRole("dialog")).getByRole("heading", { name: room.panelTitle, level: 2 })
    ).toBeTruthy();
    const closeButton = view.getByLabelText("Back to the apartment");
    expect(document.activeElement).toBe(closeButton);
    fireEvent.keyDown(closeButton, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(view.getByLabelText("Explore the next object"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(view.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  }
});

test("travel tabs support keyboard navigation and an empty city list", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByRole("button", { name: "Browse all corners" }));
  fireEvent.click(view.getByRole("button", { name: "Travel The world map" }));
  const firstTab = view.getByRole("tablist").querySelector("button");
  firstTab.focus();
  fireEvent.keyDown(firstTab, { key: "End" });
  expect(document.activeElement.textContent).toContain("New York");
  expect(within(view.getByRole("dialog")).getByText("A city that keeps you curious.")).toBeTruthy();
  view.rerender(<ApartmentPage content={{ ...fallbackContent, cities: [] }} />);
  expect(view.queryByRole("tabpanel")).toBeNull();
});

test("the scene camera opens the photography portfolio", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  const camera = view.getByLabelText("Explore photos");
  camera.focus();
  fireEvent.click(camera);

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByText(fallbackContent.settings.panels.photos.noteTitle)).toBeTruthy();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(document.activeElement).toBe(camera);

  fireEvent.keyDown(camera, { key: "Enter" });
  expect(view.getByRole("dialog")).toBeTruthy();
});

test("the camera shows curated Sanity photos", () => {
  const photo = {
    _key: "portfolio-photo",
    imageUrl: "https://cdn.sanity.io/images/example/production/photo.jpg",
    alt: "Sunlight across a New York street",
    caption: "Late afternoon",
    location: "New York",
  };
  const view = render(
    <ApartmentPage
      content={{
        ...fallbackContent,
        photographyPhotos: [photo],
      }}
    />
  );
  fireEvent.click(view.getByRole("button", { name: "Explore photos" }));

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByAltText(photo.alt).getAttribute("src")).toBe(photo.imageUrl);
  expect(dialog.getByText(photo.caption)).toBeTruthy();
});

test("Sanity book favorites appear in their categories with a Goodreads link", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      result: {
        contentModel: "dynamic-v1",
        nonfictionBooks: [
          {
            _key: "first",
            title: "First nonfiction",
            author: "One",
            note: "A lasting idea.",
            imageUrl: "https://cdn.example.com/cover.jpg",
          },
          { _key: "second", title: "Second nonfiction", author: "Two", url: "javascript:alert(1)" },
        ],
        fictionBooks: [
          { _key: "novel", title: "A novel", author: "Three", url: "https://example.com/novel" },
        ],
      },
    }),
  });
  const view = render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  await waitFor(() => expect(view.getByText("Make yourself")).toBeTruthy());
  fireEvent.click(view.getByRole("button", { name: "Explore books I like" }));
  const dialog = within(view.getByRole("dialog"));
  const nonfiction = within(await dialog.findByRole("region", { name: "Favorite nonfiction" }));
  expect(
    nonfiction.getAllByRole("heading", { level: 4 }).map((heading) => heading.textContent)
  ).toEqual(["First nonfiction", "Second nonfiction"]);
  expect(nonfiction.getByText("A lasting idea.")).toBeTruthy();
  expect(nonfiction.getByAltText("Cover of First nonfiction").getAttribute("src")).toBe(
    "https://cdn.example.com/cover.jpg"
  );
  expect(nonfiction.getAllByRole("img")).toHaveLength(1);
  expect(nonfiction.queryByRole("link")).toBeNull();
  const fiction = within(dialog.getByRole("region", { name: "Favorite fiction" }));
  expect(fiction.getByRole("link", { name: /A novel/ }).getAttribute("href")).toBe(
    "https://example.com/novel"
  );
  expect(
    dialog.getByRole("link", { name: /My reading list on Goodreads/ }).getAttribute("href")
  ).toBe("https://www.goodreads.com/rexliu");
  expect(dialog.queryByText("The shelf is still being unpacked.")).toBeNull();
});

test("published education entries appear without a résumé link", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      result: {
        contentModel: "dynamic-v1",
        educations: [
          {
            _id: "first-school",
            institutionLabel: "First School",
            logo: "https://cdn.example.com/institution.png",
            degree: "B.A. Computer Science",
            years: "2020–2023",
          },
          {
            _id: "second-school",
            institutionLabel: "Second School",
            degree: "Graduate program",
            years: "2024–2025",
            note: "Additional study.",
          },
        ],
      },
    }),
  });
  const view = render(<App />);
  await view.findByText("First School");
  fireEvent.click(view.getByRole("button", { name: /View education/ }));
  const dialog = within(view.getByRole("dialog"));
  expect(
    dialog.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)
  ).toEqual(["First School", "Second School"]);
  expect(dialog.getByText("Additional study.")).toBeTruthy();
  expect(dialog.getByRole("img").getAttribute("src")).toBe(
    "https://cdn.example.com/institution.png"
  );
  expect(dialog.queryByRole("link")).toBeNull();
});

test("the window toggles rain independently of day and night with mouse and keyboard", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  const window = view.getByRole("button", { name: "Toggle weather" });
  fireEvent.mouseEnter(window);
  expect(view.getByText("Clear skies · Toggle weather")).toBeTruthy();
  fireEvent.click(window);
  expect(window.getAttribute("aria-pressed")).toBe("true");
  expect(view.container.querySelector(".window-rain")).toBeTruthy();
  expect(view.container.querySelector(".sunbeam")).toBeNull();
  expect(view.queryByRole("dialog")).toBeNull();
  fireEvent.click(view.getByRole("button", { name: "Switch to nighttime" }));
  expect(view.container.querySelector(".window-rain")).toBeTruthy();
  fireEvent.keyDown(window, { key: "Enter" });
  expect(window.getAttribute("aria-pressed")).toBe("false");
  expect(view.container.querySelector(".window-stars")).toBeTruthy();
  fireEvent.keyDown(window, { key: " " });
  expect(window.getAttribute("aria-pressed")).toBe("true");
  fireEvent.click(view.getByRole("button", { name: "Switch to daytime" }));
  fireEvent.click(window);
  expect(view.container.querySelector(".window-clouds")).toBeTruthy();
  expect(view.container.querySelector(".sunbeam")).toBeTruthy();
});

test("Sanity visits appear on the world map with hover, focus, and tap details", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      result: {
        contentModel: "dynamic-v1",
        visitedCities: [
          {
            _id: "visit",
            name: "Vancouver",
            month: 7,
            year: 2023,
            location: { lat: 49.2827, lng: -123.1207 },
          },
        ],
      },
    }),
  });
  const view = render(<App />);
  fireEvent.click(view.getByRole("button", { name: "Explore travel logs and favorite places" }));
  const dialog = within(view.getByRole("dialog"));
  const marker = await dialog.findByRole("button", { name: "Vancouver, July 2023" });
  fireEvent.mouseEnter(marker);
  expect(within(dialog.getByRole("tooltip")).getByText("July 2023")).toBeTruthy();
  fireEvent.mouseLeave(marker);
  expect(dialog.queryByRole("tooltip")).toBeNull();
  fireEvent.focus(marker);
  expect(within(dialog.getByRole("tooltip")).getByText("Vancouver")).toBeTruthy();
  fireEvent.blur(marker);
  fireEvent.click(marker);
  expect(dialog.getByRole("tooltip")).toBeTruthy();
  expect(
    dialog.queryByText("Travel logs and favorite places are still being unpacked.")
  ).toBeNull();
});

test("the wall portrait opens the experience introduction", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByText("Start with an intro"));

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByRole("heading", { name: "About me" })).toBeTruthy();
  expect(dialog.getByText(/software engineer and UC Berkeley alum/i)).toBeTruthy();
  expect(dialog.getByAltText(fallbackContent.apartmentPortrait.alt)).toBeTruthy();
  expect(dialog.getByRole("link", { name: "Drop me a line" }).getAttribute("href")).toBe(
    `mailto:${fallbackContent.settings.email}`
  );
  expect(dialog.getByRole("heading", { name: "Get in touch" })).toBeTruthy();
});

test("the desk résumé opens work notes with open and download options", () => {
  const resumeUrl = "https://cdn.sanity.io/files/example/production/resume.pdf";
  const experiences = [
    {
      _id: "experience-example",
      company: "Example Company",
      title: "Software Engineer",
      date: "2024–Present",
      website: "https://example.com",
      note: "Built useful things.",
    },
  ];
  const content = {
    ...fallbackContent,
    settings: { ...fallbackContent.settings, resumeUrl },
    experiences,
  };
  const view = render(<ApartmentPage content={content} />);
  const paper = view.getByLabelText("Explore résumé");
  paper.focus();
  fireEvent.click(paper);

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByText("Example Company")).toBeTruthy();
  expect(dialog.getByText("Software Engineer")).toBeTruthy();
  expect(dialog.getByText("Built useful things.").tagName).toBe("P");
  expect(dialog.queryByTitle("Preview of Rex Liu’s résumé")).toBeNull();
  expect(dialog.getByText("Open full résumé").closest("a").getAttribute("href")).toBe(resumeUrl);
  expect(dialog.getByText("Download PDF").closest("a").getAttribute("href")).toBe(
    `${resumeUrl}?dl=Rex-Liu-Resume.pdf`
  );

  fireEvent.keyDown(document, { key: "Escape" });
  expect(document.activeElement).toBe(paper);
});

test("Sanity work notes appear in the homepage preview and experience popup", async () => {
  const note = "Building useful software with partners.";
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      result: {
        contentModel: "dynamic-v1",
        experiences: [{ _id: "current-work", company: "Example", title: "Engineer", note }],
      },
    }),
  });
  const view = render(<App />);
  const overview = within(view.container.querySelector(".overview-experience"));
  await waitFor(() => expect(overview.getByText(note)).toBeTruthy());
  fireEvent.click(overview.getByRole("button", { name: /Explore my experience/i }));
  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByText(note).tagName).toBe("P");
  expect(dialog.getByLabelText("Current and past work").querySelector("ul")).toBeNull();
});

test("the résumé label is painted above the laptop", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  const paper = view.getByLabelText("Explore résumé");
  const laptop = view.getByLabelText("Explore things built for fun");
  const label = view.container.querySelector(".object-tag.is-visible");

  expect(label).toBeNull();
  fireEvent.mouseEnter(paper);

  const visibleLabel = view.container.querySelector(".object-tag.is-visible");
  expect(visibleLabel.textContent).toContain("Résumé");
  expect(laptop.compareDocumentPosition(visibleLabel) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
    Node.DOCUMENT_POSITION_FOLLOWING
  );
});

test("day/night and sound controls remain functional", async () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByLabelText("Switch to nighttime"));
  expect(view.container.querySelector("main").classList.contains("is-night")).toBe(true);
  fireEvent.click(view.getByLabelText("Play café jazz"));
  await waitFor(() => expect(view.getByLabelText("Pause café jazz")).toBeTruthy());
  fireEvent.click(view.getByLabelText("Pause café jazz"));
  expect(view.getByLabelText("Play café jazz")).toBeTruthy();
});

test("room navigation updates captions and cycles back to the first room", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  const firstRoom = fallbackContent.rooms[0];
  const trigger = view.getByRole("button", { name: "Explore books I like" });
  fireEvent.mouseEnter(trigger);
  expect(view.getByText(`Explore ${firstRoom.name.toLowerCase()}`)).toBeTruthy();
  fireEvent.mouseLeave(trigger);
  expect(view.getByText(fallbackContent.settings.idleCaption)).toBeTruthy();
  fireEvent.click(trigger);

  const destinations = getContentRooms(fallbackContent.rooms);
  for (let index = 1; index <= destinations.length; index += 1) {
    fireEvent.click(view.getByLabelText("Explore the next object"));
    const room = destinations[index % destinations.length];
    expect(within(view.getByRole("dialog")).getByText(room.panelTitle)).toBeTruthy();
    expect(document.activeElement).toBe(view.getByLabelText("Back to the apartment"));
  }
});

test("music and dance opens a blank content panel while the record player opens jazz", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByLabelText("Explore music and dance"));
  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByRole("heading", { name: "Music & dance." })).toBeTruthy();
  expect(view.container.querySelector(".record-player")).toBeNull();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  fireEvent.keyDown(document, { key: "Escape" });
  fireEvent.click(view.getByLabelText("Explore the record player — choose café jazz"));
  expect(within(view.getByRole("dialog")).getByText("A little café jazz.")).toBeTruthy();
  expect(view.container.querySelector(".record-player")).toBeTruthy();
});

test("all corners expansion replaces the duplicate navigation and opens content", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  expect(view.queryByRole("navigation", { name: "Explore the apartment" })).toBeNull();
  const toggle = view.getByRole("button", { name: "Browse all corners" });
  expect(toggle.getAttribute("id")).toBe("explore");
  fireEvent.click(toggle);
  const navigation = within(view.getByRole("region", { name: "What brings you in?" }));
  expect(navigation.getByRole("button", { name: /Music & dance/ })).toBeTruthy();
  expect(navigation.queryByRole("button", { name: /\b(jazz|cat|record player)\b/i })).toBeNull();
  fireEvent.click(navigation.getByRole("button", { name: "Résumé The résumé" }));
  expect(within(view.getByRole("dialog")).getByText("The work so far.")).toBeTruthy();
});
