const siteQuery = `{
  "contentModel": "dynamic-v1",
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
  "experiences": *[_type == "experience"] | order(order asc){
    ...,
    "logo": coalesce(logoUpload.asset->url, logo)
  }
}`;

export default siteQuery;
