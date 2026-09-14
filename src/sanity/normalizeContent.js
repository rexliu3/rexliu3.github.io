import fallbackContent from "./fallbackContent";

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
  cities: { name: "", label: "", subtitle: "", text: "", illustration: "", illustrationAlt: "" },
  apartmentProjects: { name: "", image: "", type: "", text: "" },
  jazzTracks: { id: "", title: "", mood: "", duration: "", color: "", src: "" },
  experiences: { company: "", title: "", date: "", website: "", logo: "", description: [] },
  projects: {
    name: "",
    date: "",
    summary: "",
    image: "",
    logo: "",
    github: "",
    link: "",
    tools: [],
    description: [],
  },
  courseGroups: { title: "" },
  extracurriculars: { company: "", title: "", date: "", website: "", logo: "", description: [] },
  interests: { name: "", logo: "", description: "", link: "" },
  instagramPosts: {
    instagramId: "",
    mediaType: "",
    mediaUrl: "",
    thumbnailUrl: "",
    permalink: "",
    caption: "",
    timestamp: "",
    username: "",
  },
};

function normalizeCollection(name, value) {
  const collection = documents(value).map((document, index) => {
    const normalized = withDefaults(document, {
      _id: `${name}-${index}`,
      order: index,
      ...DOCUMENT_FIELDS[name],
    });
    if (name === "courseGroups") {
      normalized.courses = documents(document.courses).map((course) =>
        withDefaults(course, { _key: "", shortName: "", fullName: "", grade: "" })
      );
    }
    return normalized;
  });
  if (name === "jazzTracks") return collection.filter((track) => track.id && track.src);
  if (name === "instagramPosts") {
    return collection.filter(
      (post) => post.instagramId && post.permalink && (post.thumbnailUrl || post.mediaUrl)
    );
  }
  return collection;
}

export default function normalizeContent(content) {
  if (!isObject(content) || content.contentModel !== "dynamic-v1") {
    throw new Error("Sanity content is not initialized");
  }
  const resumeUrl =
    typeof content.resumeUrl === "string" && content.resumeUrl
      ? content.resumeUrl
      : fallbackContent.settings.resumeUrl;
  return {
    settings: { ...fallbackContent.settings, resumeUrl },
    rooms: fallbackContent.rooms,
    ...Object.fromEntries(
      Object.keys(DOCUMENT_FIELDS).map((name) => [name, normalizeCollection(name, content[name])])
    ),
  };
}
