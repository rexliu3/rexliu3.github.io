import fallbackContent from "./fallbackContent";
import { safeUrl } from "../utils/urls";

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

/** Validate known fields at the CMS boundary; preserve intentional empty strings/arrays. */
function withDefaults(value, defaults) {
  if (Array.isArray(defaults)) {
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : defaults;
  }
  if (isObject(defaults)) {
    const source = isObject(value) ? value : {};
    return Object.fromEntries(
      Object.entries(defaults).map(([key, fallback]) => [key, withDefaults(source[key], fallback)])
    );
  }
  if (typeof defaults === "number") return Number.isFinite(value) ? value : defaults;
  return typeof value === typeof defaults ? value : defaults;
}

function documents(value) {
  return Array.isArray(value) ? value.filter(isObject) : [];
}

const DOCUMENT_FIELDS = {
  educations: { institutionLabel: "", degree: "", years: "", note: "", logo: "" },
  nonfictionBooks: { _key: "", title: "", author: "", note: "", url: "", imageUrl: "" },
  fictionBooks: { _key: "", title: "", author: "", note: "", url: "", imageUrl: "" },
  cities: { name: "", label: "", subtitle: "", text: "", illustration: "", illustrationAlt: "" },
  apartmentProjects: { name: "", image: "", type: "", text: "", url: "", sourceUrl: "" },
  experiences: { company: "", title: "", date: "", website: "", logo: "", note: "" },
  photographyPhotos: { _key: "", imageUrl: "", alt: "", caption: "", location: "" },
};

function normalizeCollection(name, value) {
  const collection = documents(value).map((document, index) => {
    const normalized = withDefaults(document, {
      _id: `${name}-${index}`,
      order: index,
      ...DOCUMENT_FIELDS[name],
    });
    if (name === "experiences" && !normalized.note && Array.isArray(document.description)) {
      normalized.note = document.description.filter((item) => typeof item === "string").join(" ");
    }
    for (const key of ["image", "imageUrl", "website", "logo", "url", "sourceUrl"]) {
      if (key in normalized) normalized[key] = safeUrl(normalized[key]);
    }
    return normalized;
  });
  if (name === "photographyPhotos") {
    return collection.filter((photo) => photo.imageUrl && photo.alt);
  }
  if (name === "nonfictionBooks" || name === "fictionBooks") {
    return collection.filter((book) => book.title.trim());
  }
  return collection;
}

export default function normalizeContent(content) {
  if (!isObject(content) || content.contentModel !== "dynamic-v1") {
    throw new Error("Sanity content is not initialized");
  }
  const resumeUrl = safeUrl(content.resumeUrl, fallbackContent.settings.resumeUrl);
  const apartmentPortrait = withDefaults(
    content.apartmentPortrait,
    fallbackContent.apartmentPortrait
  );
  apartmentPortrait.imageUrl = safeUrl(
    apartmentPortrait.imageUrl,
    fallbackContent.apartmentPortrait.imageUrl
  );
  return {
    settings: { ...fallbackContent.settings, resumeUrl },
    rooms: fallbackContent.rooms,
    jazzTracks: fallbackContent.jazzTracks,
    apartmentPortrait,
    ...Object.fromEntries(
      Object.keys(DOCUMENT_FIELDS).map((name) => [name, normalizeCollection(name, content[name])])
    ),
  };
}
