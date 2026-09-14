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

export default siteQuery;
