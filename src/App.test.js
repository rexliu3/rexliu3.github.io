import React from "react";
import { cleanup, fireEvent, render, wait, within } from "@testing-library/react";
import App from "./App";
import ApartmentPage from "./components/pages/ApartmentPage";
import fallbackContent from "./sanity/fallbackContent";

const originalFetch = global.fetch;

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
});

afterEach(() => {
  cleanup();
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

test("a rejected content request still opens every room and restores keyboard focus", async () => {
  global.fetch = jest.fn().mockRejectedValue(new TypeError("Failed to fetch"));
  jest.spyOn(console, "warn").mockImplementation(() => {});
  const view = render(<App />);
  await wait(() => expect(view.getByText("Make yourself")).toBeTruthy());

  for (const room of fallbackContent.rooms) {
    const trigger =
      room.navigation === false
        ? view.getByLabelText(`Explore ${room.short.toLowerCase()}`)
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
  expect(view.getByText("A city that keeps you curious.")).toBeTruthy();
  view.rerender(<ApartmentPage content={{ ...fallbackContent, cities: [] }} />);
  expect(view.queryByRole("tabpanel")).toBeNull();
});

test("the scene camera opens the photo panel with the configured image", () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  const camera = view.getByLabelText("Explore photos");
  camera.focus();
  fireEvent.click(camera);

  const dialog = within(view.getByRole("dialog"));
  const photo = dialog.getByAltText(fallbackContent.settings.panels.photos.imageAlt);
  expect(photo.getAttribute("src")).toBe(fallbackContent.settings.panels.photos.image);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(document.activeElement).toBe(camera);

  fireEvent.keyDown(camera, { key: "Enter" });
  expect(view.getByRole("dialog")).toBeTruthy();
});

test("the camera gallery links synced Instagram posts", () => {
  const instagramPost = {
    _id: "instagram-123",
    instagramId: "123",
    mediaType: "VIDEO",
    mediaUrl: "https://cdn.example.com/video.mp4",
    thumbnailUrl: "https://cdn.example.com/thumbnail.jpg",
    permalink: "https://www.instagram.com/p/example/",
    caption: "A quiet afternoon in New York",
    timestamp: "2026-09-14T12:00:00Z",
    username: "rexliu3",
  };
  const view = render(
    <ApartmentPage content={{ ...fallbackContent, instagramPosts: [instagramPost] }} />
  );
  fireEvent.click(view.getByText("Photos"));

  const dialog = within(view.getByRole("dialog"));
  const postLink = dialog.getByLabelText(/A quiet afternoon in New York/);
  expect(postLink.getAttribute("href")).toBe(instagramPost.permalink);
  expect(dialog.getByAltText(instagramPost.caption).getAttribute("src")).toBe(
    instagramPost.thumbnailUrl
  );
  expect(dialog.queryByAltText(fallbackContent.settings.panels.photos.imageAlt)).toBeNull();
});

test("the desk résumé opens a preview with open and download options", () => {
  const resumeUrl = "https://cdn.sanity.io/files/example/production/resume.pdf";
  const content = {
    ...fallbackContent,
    settings: { ...fallbackContent.settings, resumeUrl },
  };
  const view = render(<ApartmentPage content={content} />);
  const paper = view.getByLabelText("Explore résumé");
  paper.focus();
  fireEvent.click(paper);

  const dialog = within(view.getByRole("dialog"));
  expect(dialog.getByTitle("Preview of Rex Liu’s résumé").getAttribute("src")).toBe(
    `${resumeUrl}#view=FitH`
  );
  expect(dialog.getByText("Open full résumé").closest("a").getAttribute("href")).toBe(resumeUrl);
  expect(dialog.getByText("Download PDF").closest("a").getAttribute("href")).toBe(
    `${resumeUrl}?dl=Rex-Liu-Resume.pdf`
  );

  fireEvent.keyDown(document, { key: "Escape" });
  expect(document.activeElement).toBe(paper);
});

test("day/night and sound controls remain functional", async () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByLabelText("Switch to nighttime"));
  expect(view.container.querySelector("main").classList.contains("is-night")).toBe(true);
  fireEvent.click(view.getByLabelText("Play café jazz"));
  await wait(() => expect(view.getByLabelText("Pause café jazz")).toBeTruthy());
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

  for (let index = 1; index <= fallbackContent.rooms.length; index += 1) {
    fireEvent.click(view.getByLabelText("Explore the next object"));
    const room = fallbackContent.rooms[index % fallbackContent.rooms.length];
    expect(within(view.getByRole("dialog")).getByText(room.panelTitle)).toBeTruthy();
    expect(document.activeElement).toBe(view.getByLabelText("Back to the apartment"));
  }
});
