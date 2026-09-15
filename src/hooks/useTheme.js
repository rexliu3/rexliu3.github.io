import { useEffect, useState } from "react";

const STORAGE_KEY = "apartment-theme";

function preferredNight() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "night" || saved === "day") return saved === "night";
  } catch {
    // The apartment remains usable when browser storage is disabled.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
}

export default function useTheme() {
  const [night, setNight] = useState(preferredNight);

  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", night ? "#292e2c" : "#f8f6f0");
    try {
      window.localStorage.setItem(STORAGE_KEY, night ? "night" : "day");
    } catch {
      // Preferences are optional; a storage error must not block a theme change.
    }
  }, [night]);

  return { night, toggleNight: () => setNight((current) => !current) };
}
