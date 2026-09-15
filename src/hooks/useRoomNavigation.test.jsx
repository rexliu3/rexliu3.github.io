import { act, renderHook } from "@testing-library/react";
import useRoomNavigation from "./useRoomNavigation";
import fallbackContent from "../sanity/fallbackContent";

test("opens a shared room URL and preserves other query parameters on close", () => {
  window.history.replaceState(null, "", "/?from=friend&room=photos#explore");
  const { result } = renderHook(() => useRoomNavigation(fallbackContent.rooms));
  expect(result.current.activeRoomId).toBe("photos");
  act(() => result.current.closeRoom());
  expect(window.location.search).toBe("?from=friend");
  expect(window.location.hash).toBe("#explore");
  expect(result.current.activeRoomId).toBeNull();
});

test("ignores unknown rooms and adds only one history entry while exploring", () => {
  const push = vi.spyOn(window.history, "pushState");
  const replace = vi.spyOn(window.history, "replaceState");
  const { result } = renderHook(() => useRoomNavigation(fallbackContent.rooms));
  act(() => result.current.openRoom("missing"));
  expect(result.current.activeRoomId).toBeNull();
  act(() => result.current.openRoom("books"));
  act(() => result.current.openRoom("music"));
  expect(push).toHaveBeenCalledTimes(1);
  expect(replace).toHaveBeenCalledTimes(1);
  expect(result.current.activeRoomId).toBe("music");
});
