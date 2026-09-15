import { act, renderHook } from "@testing-library/react";
import useTheme from "./useTheme";

test("restores the saved preference and persists changes", () => {
  localStorage.setItem("apartment-theme", "night");
  const { result } = renderHook(useTheme);
  expect(result.current.night).toBe(true);
  act(() => result.current.toggleNight());
  expect(localStorage.getItem("apartment-theme")).toBe("day");
  expect(document.documentElement.dataset.theme).toBe("day");
});

test("theme controls still work when storage is unavailable", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  const { result } = renderHook(useTheme);
  act(() => result.current.toggleNight());
  expect(result.current.night).toBe(true);
});
