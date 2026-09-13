import fallbackContent from "./fallbackContent";
import normalizeContent from "./normalizeContent";
import config from "./config.json";

export const sanityConfig = config;
export const CONTENT_TIMEOUT_MS = 8000;

const siteQuery = `{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0],
  "rooms": *[_type == "room"] | order(order asc),
  "cities": *[_type == "city"] | order(order asc),
  "apartmentProjects": *[_type == "apartmentProject"] | order(order asc),
  "jazzTracks": *[_type == "jazzTrack"] | order(order asc),
  "experiences": *[_type == "experience"] | order(order asc),
  "projects": *[_type == "project"] | order(order asc),
  "courseGroups": *[_type == "courseGroup"] | order(order asc),
  "extracurriculars": *[_type == "extracurricular"] | order(order asc),
  "interests": *[_type == "interest"] | order(order asc)
}`;

export async function fetchSiteContent(signal) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal) signal.addEventListener("abort", abort);
  if (signal?.aborted) controller.abort();

  let timeout;
  try {
    if (controller.signal.aborted) throw new DOMException("Request cancelled", "AbortError");
    const { projectId, dataset, apiVersion } = sanityConfig;
    const endpoint = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;
    const request = async () => {
      const response = await fetch(
        `${endpoint}?query=${encodeURIComponent(siteQuery)}&returnQuery=false`,
        { signal: controller.signal }
      );
      if (!response.ok) throw new Error(`Sanity query failed with status ${response.status}`);
      const payload = await response.json();
      return normalizeContent(payload.result);
    };
    const deadline = new Promise((resolve, reject) => {
      timeout = setTimeout(() => {
        reject(new Error("Sanity request timed out"));
        controller.abort();
      }, CONTENT_TIMEOUT_MS);
    });
    return await Promise.race([request(), deadline]);
  } catch (error) {
    if (signal?.aborted || error.name === "AbortError") throw error;
    console.warn("Sanity content could not be loaded; using bundled content.", error);
    return fallbackContent;
  } finally {
    clearTimeout(timeout);
    if (signal) signal.removeEventListener("abort", abort);
  }
}
