import { defineArrayMember, defineField, defineType } from "sanity";

const required = Rule => Rule.required();
const stringField = (name, title, extra = {}) => defineField({ name, title, type: "string", ...extra });
const textField = (name, title, extra = {}) => defineField({ name, title, type: "text", rows: 3, ...extra });
const urlField = (name, title) => defineField({ name, title, type: "url" });
const orderField = defineField({ name: "order", title: "Display order", type: "number", validation: required });
const stringArray = (name, title) => defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })] });

const panelObject = (name, title, fields) => defineField({ name, title, type: "object", fields });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    stringField("name", "Name"), stringField("brand", "Brand"), stringField("location", "Location"),
    stringField("email", "Email"), stringField("helloLabel", "Hello link label"),
    urlField("githubUrl", "GitHub URL"), urlField("linkedinUrl", "LinkedIn URL"), stringField("resumeUrl", "Résumé path"),
    stringField("introEyebrow", "Intro eyebrow"), stringField("introTitle", "Intro title"), stringField("introEmphasis", "Intro emphasis"),
    stringArray("introLines", "Intro lines"), stringField("apartmentLabel", "Apartment label"), stringField("apartmentNote", "Apartment note"),
    stringArray("asideLines", "Room aside lines"), stringField("idleCaption", "Idle caption"), stringField("catCaption", "Cat caption"),
    stringField("speakerLabel", "Speaker label"), stringField("signature", "Signature"), stringField("footerTagline", "Footer tagline"),
    stringField("panelEyebrow", "Panel eyebrow"),
    panelObject("profile", "Profile", [
      stringField("portrait", "Portrait path"), textField("aboutLead", "About lead"), stringArray("aboutParagraphs", "About paragraphs"),
      stringArray("languages", "Languages"), stringArray("recognition", "Recognition"),
    ]),
    panelObject("panels", "Panel content", [
      panelObject("books", "Books", [stringArray("spines", "Decorative book spines"), stringField("noteTitle", "Note title"), textField("noteBody", "Note body")]),
      panelObject("travel", "Travel", [stringField("tabsLabel", "Tabs accessibility label"), textField("footnote", "Footnote")]),
      panelObject("projects", "Projects", [stringField("linkLabel", "GitHub link label")]),
      panelObject("music", "Music", [stringField("choicesLabel", "Choices label"), stringField("creditsPrefix", "Credits prefix"), stringField("artistLabel", "Artist label"), urlField("artistUrl", "Artist URL"), stringField("licensePrefix", "License prefix"), stringField("licenseLabel", "License label"), urlField("licenseUrl", "License URL")]),
      panelObject("photos", "Photos", [stringField("image", "Photo path"), stringField("imageAlt", "Photo alt text"), stringField("caption", "Caption"), stringField("byline", "Byline"), stringField("noteTitle", "Note title"), textField("noteBody", "Note body")]),
      panelObject("education", "Education", [stringField("seal", "Seal"), stringField("institutionLabel", "Institution label"), stringField("school", "School"), stringField("degree", "Degree"), stringField("years", "Years"), stringField("storyTitle", "Story title"), stringArray("storyParagraphs", "Story paragraphs"), stringField("linkLabel", "Résumé link label")]),
    ]),
  ],
  preview: { prepare: () => ({ title: "Rex’s Internet Apartment" }) },
});

export const room = defineType({
  name: "room", title: "Apartment room object", type: "document",
  fields: [stringField("id", "ID", { validation: required }), stringField("name", "Name"), stringField("short", "Navigation label"), stringField("icon", "Icon"), stringField("panelTitle", "Panel title"), textField("lede", "Panel introduction"), orderField],
  preview: { select: { title: "name", subtitle: "short" } },
});

export const city = defineType({
  name: "city", title: "City lived", type: "document",
  fields: [stringField("name", "Name"), stringField("label", "Chapter label"), stringField("subtitle", "Subtitle"), textField("text", "Story"), stringField("illustration", "Illustration", { options: { list: ["vancouver", "san-francisco", "new-york"] } }), stringField("illustrationAlt", "Illustration alt text"), orderField],
});

export const apartmentProject = defineType({
  name: "apartmentProject", title: "Apartment side project", type: "document",
  fields: [stringField("name", "Name"), stringField("image", "Image path"), stringField("type", "Kicker"), textField("text", "Description"), orderField],
});

export const jazzTrack = defineType({
  name: "jazzTrack", title: "Jazz track", type: "document",
  fields: [stringField("id", "ID"), stringField("title", "Title"), stringField("mood", "Mood"), stringField("duration", "Duration"), stringField("color", "Record color"), stringField("src", "Audio path"), orderField],
});

export const experience = defineType({
  name: "experience", title: "Experience", type: "document",
  fields: [stringField("company", "Company"), stringField("title", "Role"), stringField("date", "Date and location"), urlField("website", "Website"), stringField("logo", "Logo path"), stringArray("description", "Highlights"), orderField],
});

export const project = defineType({
  name: "project", title: "Portfolio project", type: "document",
  fields: [stringField("name", "Name"), stringField("date", "Date"), textField("summary", "Summary"), stringField("image", "Image path"), stringField("logo", "Logo path"), urlField("github", "GitHub URL"), urlField("link", "Live URL"), stringArray("tools", "Tools"), stringArray("description", "Details"), orderField],
});

export const courseGroup = defineType({
  name: "courseGroup", title: "Course group", type: "document",
  fields: [stringField("title", "Title"), defineField({ name: "courses", title: "Courses", type: "array", of: [defineArrayMember({ type: "object", fields: [stringField("shortName", "Course code"), stringField("fullName", "Course name"), stringField("grade", "Grade")] })] }), orderField],
});

export const extracurricular = defineType({
  name: "extracurricular", title: "Community experience", type: "document",
  fields: [stringField("company", "Organization"), stringField("title", "Role"), stringField("date", "Date"), urlField("website", "Website"), stringField("logo", "Logo path"), stringArray("description", "Highlights"), orderField],
});

export const interest = defineType({
  name: "interest", title: "Interest", type: "document",
  fields: [stringField("name", "Name"), stringField("logo", "Icon path"), textField("description", "Description"), urlField("link", "Link"), orderField],
});

export const schemaTypes = [siteSettings, room, city, apartmentProject, jazzTrack, experience, project, courseGroup, extracurricular, interest];
