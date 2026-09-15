import React from "react";
import { fireEvent, render } from "@testing-library/react";
import RoomDirectory from "./RoomDirectory";
import fallbackContent from "../../sanity/fallbackContent";

test("searches room descriptions and recovers from an empty result", () => {
  const onOpen = vi.fn();
  const view = render(
    <RoomDirectory rooms={fallbackContent.rooms} onOpen={onOpen} onClose={() => {}} />
  );
  const input = view.getByRole("searchbox", { name: "Find a room" });
  fireEvent.change(input, { target: { value: "  PHOTOs  " } });
  fireEvent.click(view.getByRole("button", { name: "Photos The camera" }));
  expect(onOpen).toHaveBeenCalledWith("photos");
  expect(view.getByRole("status")).toHaveTextContent("1 room found");
  fireEvent.change(input, { target: { value: "no-such-corner" } });
  expect(view.getByRole("status")).toHaveTextContent("0 rooms found");
  fireEvent.click(view.getByRole("button", { name: "show every room" }));
  expect(view.getByRole("status")).toHaveTextContent("8 rooms found");
});
