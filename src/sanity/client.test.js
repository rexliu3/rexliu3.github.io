import fallbackContent from "./fallbackContent";
import { CONTENT_TIMEOUT_MS, fetchSiteContent } from "./client";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  vi.useRealTimers();
  vi.restoreAllMocks();
});

test("returns content from Sanity when the request succeeds", async () => {
  const content = {
    contentModel: "dynamic-v1",
    resumeUrl: "https://cdn.sanity.io/files/example/resume.pdf",
    experiences: [{ _id: "experience-1", company: "Example" }],
  };
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({ result: content }),
  });

  await expect(fetchSiteContent()).resolves.toMatchObject({
    settings: {
      brand: fallbackContent.settings.brand,
      resumeUrl: content.resumeUrl,
    },
    experiences: content.experiences,
    rooms: fallbackContent.rooms,
  });
});

test("uses bundled content when a preview origin is rejected", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 403 });

  await expect(fetchSiteContent()).resolves.toBe(fallbackContent);
});

test("does not turn a cancelled request into fallback content", async () => {
  const error = new Error("cancelled");
  error.name = "AbortError";
  global.fetch = vi.fn().mockRejectedValue(error);

  await expect(fetchSiteContent()).rejects.toBe(error);
});

test("falls back after a timeout instead of leaving the apartment loading", async () => {
  vi.useFakeTimers();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  global.fetch = vi.fn().mockReturnValue(new Promise(() => {}));

  const content = fetchSiteContent();
  vi.advanceTimersByTime(CONTENT_TIMEOUT_MS);
  await expect(content).resolves.toBe(fallbackContent);
  expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(true);
});

test("does not fetch when the caller has already cancelled", async () => {
  const controller = new AbortController();
  controller.abort();
  global.fetch = vi.fn();
  await expect(fetchSiteContent(controller.signal)).rejects.toMatchObject({ name: "AbortError" });
  expect(global.fetch).not.toHaveBeenCalled();
});

test.each([
  ["a browser CORS/network error", () => Promise.reject(new TypeError("Failed to fetch"))],
  [
    "an invalid JSON response",
    () =>
      Promise.resolve({ ok: true, json: () => Promise.reject(new SyntaxError("Invalid JSON")) }),
  ],
  [
    "an uninitialized dataset",
    () => Promise.resolve({ ok: true, json: () => Promise.resolve({ result: {} }) }),
  ],
])("uses fallback for %s", async (description, response) => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  global.fetch = vi.fn(response);
  await expect(fetchSiteContent()).resolves.toBe(fallbackContent);
});
