export const sanityConfig = {
  projectId: "xvwhy7q4",
  dataset: "production",
  apiVersion: "2025-02-19",
};

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
  const { projectId, dataset, apiVersion } = sanityConfig;
  const endpoint = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;
  const response = await fetch(`${endpoint}?query=${encodeURIComponent(siteQuery)}&returnQuery=false`, { signal });

  if (!response.ok) throw new Error(`Sanity query failed with status ${response.status}`);
  const payload = await response.json();
  if (!payload.result || !payload.result.settings) throw new Error("Sanity content is not initialized");
  return payload.result;
}
