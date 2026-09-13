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
};

function normalizeCollection(name, value) {
  return documents(value).map((document, index) => {
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
}

export default function normalizeContent(content) {
  if (!isObject(content) || !isObject(content.settings)) {
    throw new Error("Sanity content is not initialized");
  }
  const rooms = documents(content.rooms);
  return {
    settings: withDefaults(content.settings, fallbackContent.settings),
    // Hotspots are part of the drawing, so every supported room needs metadata.
    rooms: fallbackContent.rooms
      .map((room) =>
        withDefaults(
          rooms.find((item) => item.id === room.id),
          room
        )
      )
      .sort((a, b) => a.order - b.order),
    ...Object.fromEntries(
      Object.keys(DOCUMENT_FIELDS).map((name) => [name, normalizeCollection(name, content[name])])
    ),
    jazzTracks: normalizeCollection("jazzTracks", content.jazzTracks).filter(
      (track) => track.id && track.src
    ),
  };
}
