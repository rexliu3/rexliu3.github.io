import defaultContent from "./defaultContent.json";

// The seed script and browser share the same editable apartment defaults.
// Legacy portfolio collections have no bundled snapshot.
const fallbackContent = {
  ...defaultContent,
  experiences: [],
  projects: [],
  courseGroups: [],
  extracurriculars: [],
};

export default fallbackContent;
