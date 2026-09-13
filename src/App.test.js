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
    const trigger = within(view.getByLabelText("Explore the apartment"))
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

test("day/night and sound controls remain functional", async () => {
  const view = render(<ApartmentPage content={fallbackContent} />);
  fireEvent.click(view.getByLabelText("Switch to nighttime"));
  expect(view.container.querySelector("main").classList.contains("is-night")).toBe(true);
  fireEvent.click(view.getByLabelText("Play café jazz"));
  await wait(() => expect(view.getByLabelText("Pause café jazz")).toBeTruthy());
  fireEvent.click(view.getByLabelText("Pause café jazz"));
  expect(view.getByLabelText("Play café jazz")).toBeTruthy();
});
