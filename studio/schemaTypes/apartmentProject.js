import { defineType } from "sanity";
import { stringField, textField, imageField, orderField, urlField, required } from "./fields";

export const apartmentProject = defineType({
  name: "apartmentProject",
  title: "Apartment side project",
  type: "document",
  fields: [
    stringField("name", "Name", { validation: required }),
    imageField("imageUpload", "Project image"),
    stringField("type", "Kicker"),
    textField("text", "Description"),
    urlField("url", "Live project URL"),
    urlField("sourceUrl", "Source code URL"),
    orderField,
  ],
});
