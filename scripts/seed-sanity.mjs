import { createRequire } from "module";

const require = createRequire(import.meta.url);
const defaultContent = require("../src/sanity/defaultContent.json");
const sanityConfig = require("../src/sanity/config.json");

const projectId = process.env.SANITY_PROJECT_ID || sanityConfig.projectId;
const dataset = process.env.SANITY_DATASET || sanityConfig.dataset;
const token = process.env.SANITY_API_TOKEN;
const { apiVersion } = sanityConfig;

if (!token) throw new Error("SANITY_API_TOKEN is required");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const localPath = (value) => (value && !value.startsWith("/") ? `/${value}` : value);

function decodeFirestoreValue(value) {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeFirestoreValue);
  if ("mapValue" in value) return decodeFirestoreFields(value.mapValue.fields || {});
  throw new Error(`Unsupported Firestore value: ${JSON.stringify(value)}`);
}

function decodeFirestoreFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, decodeFirestoreValue(value)])
  );
}

async function fetchLegacyCollection(name) {
  const endpoint = `https://firestore.googleapis.com/v1/projects/rex-website-b3eae/databases/(default)/documents/${name}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Could not read legacy ${name}: ${response.status}`);
  const payload = await response.json();
  return (payload.documents || []).map((document) => ({
    legacyId: decodeURIComponent(document.name.split("/").pop()),
    ...decodeFirestoreFields(document.fields),
  }));
}

const { settings, rooms, cities, apartmentProjects, jazzTracks, interests } = defaultContent;

const [legacyExperiences, legacyProjects, legacyCourseGroups, legacyExtracurriculars] =
  await Promise.all([
    fetchLegacyCollection("Experiences"),
    fetchLegacyCollection("Projects"),
    fetchLegacyCollection("Courses"),
    fetchLegacyCollection("Extracurriculars"),
  ]);

const experiences = [
  {
    _id: "experience-palantir-technologies",
    _type: "experience",
    company: "Palantir Technologies",
    title: "Current role",
    date: "New York · Present",
    website: "https://www.linkedin.com/company/palantir-technologies",
    order: 0,
  },
  ...legacyExperiences.map((document, index) => ({
    _id: `experience-${slugify(document.legacyId)}`,
    _type: "experience",
    ...document,
    logo: localPath(document.logo),
    order: index + 1,
  })),
];
const projects = legacyProjects.map((document, order) => ({
  _id: `project-${slugify(document.legacyId)}`,
  _type: "project",
  ...document,
  image: localPath(document.image),
  logo: localPath(document.logo),
  order,
}));
const courseGroups = legacyCourseGroups.map((document) => ({
  _id: `course-group-${slugify(document.legacyId)}`,
  _type: "courseGroup",
  ...document,
  courses: document.courses.map((course, index) => ({
    _key: `${slugify(course.shortName)}-${index}`,
    ...course,
  })),
}));
const extracurriculars = legacyExtracurriculars.map((document, order) => ({
  _id: `extracurricular-${slugify(document.legacyId)}`,
  _type: "extracurricular",
  ...document,
  logo: localPath(document.logo),
  order,
}));

const documents = [
  settings,
  ...rooms,
  ...cities,
  ...apartmentProjects,
  ...jazzTracks,
  ...experiences,
  ...projects,
  ...courseGroups,
  ...extracurriculars,
  ...interests,
].map(({ legacyId, ...document }) => document);

const response = await fetch(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      mutations: documents.map((document) => ({ createOrReplace: document })),
    }),
  }
);

if (!response.ok)
  throw new Error(`Sanity mutation failed (${response.status}): ${await response.text()}`);
const result = await response.json();
console.log(`Seeded ${result.results.length} documents into ${projectId}/${dataset}.`);
