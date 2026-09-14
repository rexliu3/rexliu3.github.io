const siteQuery = `{
  "contentModel": "dynamic-v1",
  "resumeUrl": *[_type == "resume" && _id == "resume"][0].file.asset->url,
  "cities": *[_type == "city"] | order(order asc),
  "apartmentProjects": *[_type == "apartmentProject"] | order(order asc),
  "jazzTracks": *[_type == "jazzTrack"] | order(order asc),
  "experiences": *[_type == "experience"] | order(order asc),
  "projects": *[_type == "project"] | order(order asc),
  "courseGroups": *[_type == "courseGroup"] | order(order asc),
  "extracurriculars": *[_type == "extracurricular"] | order(order asc),
  "interests": *[_type == "interest"] | order(order asc),
  "instagramPosts": *[_type == "instagramPost"] | order(timestamp desc)[0...12]
}`;

export default siteQuery;
