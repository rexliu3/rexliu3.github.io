import defaultContent from "./defaultContent.json";

// Website copy and room metadata are local. Selected changing collections also
// provide a bundled fallback and seed source; legacy portfolio collections do not.
const fallbackContent = {
  ...defaultContent,
  experiences: [],
  projects: [],
  courseGroups: [],
  extracurriculars: [],
  instagramPosts: [],
};

export default fallbackContent;
