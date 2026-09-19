import defaultContent from "./defaultContent.json";

// Website copy and room metadata are local. Selected changing collections also
// provide a bundled fallback and seed source; legacy portfolio collections do not.
const fallbackContent = {
  ...defaultContent,
  experiences: [],
  visitedCities: [],
  educations: [{ _id: "education-berkeley", ...defaultContent.settings.panels.education }],
  nonfictionBooks: [],
  fictionBooks: [],
  topSongsByYear: [],
  photographyPhotos: [],
  apartmentPortrait: {
    imageUrl: "/assets/Profile-Picture.png",
    alt: "Portrait of Rex Liu",
  },
};

export default fallbackContent;
