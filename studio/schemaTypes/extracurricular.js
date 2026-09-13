import { defineType } from "sanity";
import { stringField, urlField, orderField, stringArray } from "./fields";

export const extracurricular = defineType({
  name: "extracurricular",
  title: "Community experience",
  type: "document",
  fields: [
    stringField("company", "Organization"),
    stringField("title", "Role"),
    stringField("date", "Date"),
    urlField("website", "Website"),
    stringField("logo", "Logo path"),
    stringArray("description", "Highlights"),
    orderField,
  ],
});
