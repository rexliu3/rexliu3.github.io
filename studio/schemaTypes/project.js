import { defineType } from "sanity";
import { stringField, textField, urlField, orderField, stringArray } from "./fields";

export const project = defineType({
  name: "project",
  title: "Portfolio project",
  type: "document",
  fields: [
    stringField("name", "Name"),
    stringField("date", "Date"),
    textField("summary", "Summary"),
    stringField("image", "Image path"),
    stringField("logo", "Logo path"),
    urlField("github", "GitHub URL"),
    urlField("link", "Live URL"),
    stringArray("tools", "Tools"),
    stringArray("description", "Details"),
    orderField,
  ],
});
