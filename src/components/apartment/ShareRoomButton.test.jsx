import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import ShareRoomButton from "./ShareRoomButton";

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else delete navigator.clipboard;
});

test("copies the current room URL", async () => {
  window.history.replaceState(null, "", "/?room=music");
  const writeText = vi.fn().mockResolvedValue();
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  const view = render(<ShareRoomButton />);
  fireEvent.click(view.getByRole("button", { name: "Copy room link" }));
  await waitFor(() => expect(view.getByRole("status")).toHaveTextContent("Link copied"));
  expect(writeText).toHaveBeenCalledWith(window.location.href);
});

test("offers an address-bar fallback when clipboard access fails", async () => {
  const view = render(<ShareRoomButton />);
  fireEvent.click(view.getByRole("button", { name: "Copy room link" }));
  await waitFor(() =>
    expect(view.getByRole("status")).toHaveTextContent("Copy the link from your address bar.")
  );
});
