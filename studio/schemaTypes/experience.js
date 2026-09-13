import { defineType } from "sanity";
import { stringField, urlField, orderField, stringArray } from "./fields";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    stringField("company", "Company"),
    stringField("title", "Role"),
    stringField("date", "Date and location"),
    urlField("website", "Website"),
    stringField("logo", "Logo path"),
    stringArray("description", "Highlights"),
    orderField,
  ],
});
