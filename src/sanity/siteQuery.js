const siteQuery = `{
  "contentModel": "dynamic-v1",
  "visitedCities": *[_type == "cityVisited"] | order(year desc, month desc){_id, name, month, year, location},
  "educations": *[_type == "education"] | order(order desc){
    ..., "logo": logoUpload.asset->url
  },
  "nonfictionBooks": *[_type == "bookshelf" && _id == "bookshelf"][0].nonfiction[]{
    ..., "imageUrl": cover.asset->url
  },
  "fictionBooks": *[_type == "bookshelf" && _id == "bookshelf"][0].fiction[]{
    ..., "imageUrl": cover.asset->url
  },
  "topSongsByYear": *[_type == "topSongs" && _id == "topSongs"][0].years[]{
    _key,
    year,
    songs[]{_key, title, artist, spotifyUrl}
  },
  "resumeUrl": *[_type == "resume" && _id == "resume"][0].file.asset->url,
  "apartmentPortrait": *[_type == "apartmentPortrait" && _id == "apartmentPortrait"][0]{
    "imageUrl": image.asset->url,
    alt
  },
  "photographyPhotos": *[_type == "photographyPortfolio" && _id == "photographyPortfolio"][0].images[]{
    _key,
    "imageUrl": image.asset->url,
    alt,
    caption,
    location
  },
  "cities": *[_type == "city"] | order(order asc),
  "apartmentProjects": *[_type == "apartmentProject"] | order(order asc){
    ...,
    "image": coalesce(imageUpload.asset->url, image)
  },
  "experiences": *[_type == "experience"] | order(order desc){
    ...,
    "logo": coalesce(logoUpload.asset->url, logo)
  }
}`;

export default siteQuery;
