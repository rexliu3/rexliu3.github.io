const projectId = process.env.SANITY_PROJECT_ID || "xvwhy7q4";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const apiVersion = "2025-02-19";

if (!token) throw new Error("SANITY_API_TOKEN is required");

const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const localPath = value => value && !value.startsWith("/") ? `/${value}` : value;

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
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeFirestoreValue(value)]));
}

async function fetchLegacyCollection(name) {
  const endpoint = `https://firestore.googleapis.com/v1/projects/rex-website-b3eae/databases/(default)/documents/${name}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Could not read legacy ${name}: ${response.status}`);
  const payload = await response.json();
  return (payload.documents || []).map(document => ({
    legacyId: decodeURIComponent(document.name.split("/").pop()),
    ...decodeFirestoreFields(document.fields),
  }));
}

const settings = {
  _id: "siteSettings", _type: "siteSettings",
  name: "Rex Liu", brand: "rex’s apartment", location: "Somewhere in New York", email: "rexliu3@berkeley.edu", helloLabel: "Say hello",
  githubUrl: "https://github.com/rexliu3", linkedinUrl: "https://linkedin.com/in/rexliu3", resumeUrl: "/Resume_RexLiu.pdf",
  introEyebrow: "THE DOOR’S ALWAYS OPEN", introTitle: "Make yourself", introEmphasis: "at home.",
  introLines: ["I’m Rex. Builder, wanderer, and collector of little joys.", "Welcome to my little corner of the internet."],
  apartmentLabel: "APT. 001", apartmentNote: "A WORK IN PROGRESS, LIKE ME", asideLines: ["a few of my", "favorite things"],
  idleCaption: "Every object has a story. Click around.", catCaption: "Pet the cat", speakerLabel: "the speaker", signature: "stay a little while ♡",
  footerTagline: "Built with curiosity. Lived in with love.", panelEyebrow: "A LITTLE PIECE OF MY WORLD",
  profile: {
    portrait: "/assets/Profile-Picture.png",
    aboutLead: "I’m a UC Berkeley computer science graduate based in New York and working at Palantir Technologies.",
    aboutParagraphs: [
      "My experience spans frontend and backend development, mobile apps, data, and leading engineering teams. I enjoy turning ambitious ideas into clear, dependable software that solves meaningful problems.",
      "Away from a screen, you’ll usually find me studying chess positions, playing tennis, or competing on a badminton court.",
    ],
    languages: ["English", "Mandarin", "Spanish"],
    recognition: ["Runner-up · Hack at UCI 2021", "Grand Winner · 41st UBC Physics Olympics"],
  },
  panels: {
    books: { spines: ["STORIES", "IDEAS", "CURIOSITY", "OTHER WORLDS"], noteTitle: "The shelf is still being unpacked.", noteBody: "My reading list and personal notes will live here. Check back for the first stack." },
    travel: { tabsLabel: "Cities on my journey", footnote: "Travel logs and favorite places are still being unpacked." },
    projects: { linkLabel: "More things on GitHub" },
    music: { choicesLabel: "FIVE RECORDS FOR A SLOW AFTERNOON", creditsPrefix: "All five recordings by", artistLabel: "Kevin MacLeod (incompetech.com)", artistUrl: "https://incompetech.com/music/royalty-free/", licensePrefix: "licensed under", licenseLabel: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" },
    photos: { image: "/assets/Profile-Picture.png", imageAlt: "Rex Liu", caption: "Hello from the other side of the camera.", byline: "— Rex", noteTitle: "A photo album in the making.", noteBody: "More snapshots and stories will find their way here." },
    education: { seal: "B", institutionLabel: "UNIVERSITY OF CALIFORNIA", school: "Berkeley", degree: "B.A. Computer Science", years: "2020–2023", storyTitle: "Curiosity found a home.", storyParagraphs: ["My Berkeley journey laid the foundation for my work in software engineering—from frontend and backend development to mobile apps, data, and leading engineering teams.", "Today, I’m building at Palantir Technologies in New York. The habit of asking questions came with me."], linkLabel: "Take a look at my résumé" },
  },
};

const rooms = [
  ["books", "The bookshelf", "Books", "book", "Between the covers.", "A home for the books I like, the ideas that linger, and the pages worth coming back to."],
  ["travel", "The world map", "Travel", "globe", "Places that stay with you.", "Three cities. Different chapters. One ongoing adventure."],
  ["projects", "The laptop", "Side projects", "laptop", "Made just because.", "Small experiments and familiar games. Sometimes curiosity is the whole brief."],
  ["music", "The record player", "Café jazz", "music", "A little café jazz.", "Pick a record, pour something warm, and stay a little while."],
  ["photos", "The camera", "Photos", "camera", "The little moments.", "People, places, and ordinary days worth remembering."],
  ["berkeley", "The diploma", "Berkeley", "diploma", "A chapter in blue & gold.", "Three years of questions, late nights, and learning how to build things that matter."],
].map(([id, name, short, icon, panelTitle, lede], order) => ({ _id: `room-${id}`, _type: "room", id, name, short, icon, panelTitle, lede, order }));

const cities = [
  { name: "Vancouver", label: "01 / THE FIRST CHAPTER", subtitle: "Mountains. Ocean. Beginnings.", text: "The first pin on the map. Vancouver marks the beginning of a journey that would lead down the West Coast and across the continent.", illustration: "vancouver", illustrationAlt: "Illustration of mountains in Vancouver" },
  { name: "San Francisco", label: "02 / THE BAY AREA CHAPTER", subtitle: "A little fog. A lot of possibility.", text: "The Bay Area chapter, with Berkeley just across the water. A place for learning, building, and finding new directions.", illustration: "san-francisco", illustrationAlt: "Illustration of the Golden Gate Bridge" },
  { name: "New York", label: "03 / THE CURRENT CHAPTER", subtitle: "A city that keeps you curious.", text: "The latest pin, and the place I call home. I’m a software engineer at Palantir Technologies, making things in a city that never runs out of things to discover.", illustration: "new-york", illustrationAlt: "Illustration of the New York skyline" },
].map((document, order) => ({ _id: `city-${slugify(document.name)}`, _type: "city", ...document, order }));

const apartmentProjects = [
  { name: "Minesweeper", image: "/assets/Minesweeper-Wall.png", type: "A classic, rebuilt", text: "A little logic, a little luck, and one more game." },
  { name: "Sorting visualizer", image: "/assets/Sorting-Wall.png", type: "Making algorithms visible", text: "A visual exploration of how order emerges from a jumble of numbers." },
  { name: "Sudoku", image: "/assets/Sudoku-Wall.gif", type: "For the puzzle people", text: "A playground for numbers, patterns, and satisfying solutions." },
].map((document, order) => ({ _id: `apartment-project-${slugify(document.name)}`, _type: "apartmentProject", ...document, order }));

const jazzTracks = [
  ["bossa-antigua", "Bossa Antigua", "A sunny little bossa nova", "4:43", "#b96743"],
  ["jazz-brunch", "Jazz Brunch", "Easy Sunday café grooves", "5:23", "#859574"],
  ["george-street-shuffle", "George Street Shuffle", "Light swing & mellow vibraphone", "4:28", "#b59a5f"],
  ["local-forecast-slower", "Local Forecast - Slower", "Laid-back lounge for a slow afternoon", "3:19", "#738e8a"],
  ["apero-hour", "Apero Hour", "Cool jazz for the golden hour", "4:43", "#9a7c88"],
].map(([id, title, mood, duration, color], order) => ({ _id: `jazz-${id}`, _type: "jazzTrack", id, title, mood, duration, color, src: `/audio/${id}.mp3`, order }));

const interests = [
  { name: "Chess", logo: "/assets/Chess.png", description: "Strategy, pattern recognition, and a good long game.", link: "https://www.chess.com/member/rexliu3" },
  { name: "Badminton", logo: "/assets/badminton.png", description: "BC regional doubles champion." },
  { name: "Tennis", logo: "/assets/tennis.png", description: "Always working on the next rally." },
  { name: "Data science", logo: "/assets/data.png", description: "Finding useful signals in complex systems." },
  { name: "Blockchain", logo: "/assets/Blockchain.jpg", description: "Exploring open, distributed infrastructure." },
  { name: "Machine learning", logo: "/assets/machine-learning.png", description: "Building software that learns and adapts." },
].map((document, order) => ({ _id: `interest-${slugify(document.name)}`, _type: "interest", ...document, order }));

const [legacyExperiences, legacyProjects, legacyCourseGroups, legacyExtracurriculars] = await Promise.all([
  fetchLegacyCollection("Experiences"), fetchLegacyCollection("Projects"), fetchLegacyCollection("Courses"), fetchLegacyCollection("Extracurriculars"),
]);

const experiences = [
  { _id: "experience-palantir-technologies", _type: "experience", company: "Palantir Technologies", title: "Current role", date: "New York · Present", website: "https://www.linkedin.com/company/palantir-technologies", order: 0 },
  ...legacyExperiences.map((document, index) => ({ _id: `experience-${slugify(document.legacyId)}`, _type: "experience", ...document, logo: localPath(document.logo), order: index + 1 })),
];
const projects = legacyProjects.map((document, order) => ({ _id: `project-${slugify(document.legacyId)}`, _type: "project", ...document, image: localPath(document.image), logo: localPath(document.logo), order }));
const courseGroups = legacyCourseGroups.map(document => ({ _id: `course-group-${slugify(document.legacyId)}`, _type: "courseGroup", ...document, courses: document.courses.map((course, index) => ({ _key: `${slugify(course.shortName)}-${index}`, ...course })) }));
const extracurriculars = legacyExtracurriculars.map((document, order) => ({ _id: `extracurricular-${slugify(document.legacyId)}`, _type: "extracurricular", ...document, logo: localPath(document.logo), order }));

const documents = [settings, ...rooms, ...cities, ...apartmentProjects, ...jazzTracks, ...experiences, ...projects, ...courseGroups, ...extracurriculars, ...interests]
  .map(({ legacyId, ...document }) => document);

const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations: documents.map(document => ({ createOrReplace: document })) }),
});

if (!response.ok) throw new Error(`Sanity mutation failed (${response.status}): ${await response.text()}`);
const result = await response.json();
console.log(`Seeded ${result.results.length} documents into ${projectId}/${dataset}.`);
