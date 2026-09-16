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

  for (const room of fallbackContent.rooms) {
    const trigger =
      room.content === false
        ? view.getByLabelText("Explore the record player — choose café jazz")
        : within(view.getByLabelText("Explore the apartment"))
            .getByText(room.short)
            .closest("button");
    trigger.focus();
    fireEvent.click(trigger);
    expect(view.getByRole("dialog")).toBeTruthy();
    expect(view.getByText(room.panelTitle)).toBeTruthy();
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
  fireEvent.click(view.getByText("Travel"));
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
  fireEvent.click(view.getByText("Photos"));

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByAltText(photo.alt).getAttribute("src")).toBe(photo.imageUrl);
  expect(dialog.getByText(photo.caption)).toBeTruthy();
});

test("the wall portrait opens the experience introduction", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByText("Start with an intro"));

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByText("Hello from the other side.")).toBeTruthy();
  expect(dialog.getByText(/software engineer at Palantir/i)).toBeTruthy();
  expect(dialog.getByAltText(fallbackContent.apartmentPortrait.alt)).toBeTruthy();
  expect(dialog.getByText("say hello by email").closest("a").getAttribute("href")).toBe(
    `mailto:${fallbackContent.settings.email}`
  );
  expect(dialog.getByText(/click whatever catches your eye/i)).toBeTruthy();
});

test("the desk résumé opens past experience with open and download options", () => {
  const resumeUrl = "https://cdn.sanity.io/files/example/production/resume.pdf";
  const experiences = [
    {
      _id: "experience-example",
      company: "Example Company",
      title: "Software Engineer",
      date: "2024–Present",
      website: "https://example.com",
      description: ["Built useful things."],
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
  expect(dialog.queryByTitle("Preview of Rex Liu’s résumé")).toBeNull();
  expect(dialog.getByText("Open full résumé").closest("a").getAttribute("href")).toBe(resumeUrl);
  expect(dialog.getByText("Download PDF").closest("a").getAttribute("href")).toBe(
    `${resumeUrl}?dl=Rex-Liu-Resume.pdf`
  );

  fireEvent.keyDown(document, { key: "Escape" });
  expect(document.activeElement).toBe(paper);
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
  const navigation = within(view.getByLabelText("Explore the apartment"));
  const firstRoom = fallbackContent.rooms[0];
  const trigger = navigation.getByText(firstRoom.short).closest("button");
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

test("bottom navigation contains content, including music taste and résumé", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  const navigation = within(view.getByRole("navigation", { name: "Explore the apartment" }));
  expect(navigation.getByRole("button", { name: "Music & dance" })).toBeTruthy();
  expect(navigation.queryByRole("button", { name: /jazz|cat|record player/i })).toBeNull();
  fireEvent.click(navigation.getByRole("button", { name: "Résumé" }));
  expect(within(view.getByRole("dialog")).getByText("The work so far.")).toBeTruthy();
});
