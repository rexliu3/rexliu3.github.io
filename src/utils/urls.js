/** Accept web URLs and site-relative paths, never executable or protocol-relative URLs. */
export function safeUrl(value, fallback = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const url = value.trim();
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) {
    const base = "https://apartment.invalid";
    return new URL(url, base).origin === base ? url : fallback;
  }
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : fallback;
  } catch {
    return fallback;
  }
}

export function resumeDownloadUrl(url) {
  if (!url.startsWith("https://cdn.sanity.io/files/")) return url;
  const download = new URL(url);
  download.searchParams.set("dl", "Rex-Liu-Resume.pdf");
  return download.href;
}
