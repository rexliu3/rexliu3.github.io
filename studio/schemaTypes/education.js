import { defineType } from "sanity";
import { imageField, orderField, required, stringField, textField } from "./fields";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    stringField("institutionLabel", "Institution", { validation: required }),
    imageField("logoUpload", "Institution logo (optional)"),
    stringField("degree", "Degree or program", { validation: required }),
    stringField("years", "Dates", { validation: required }),
    textField("note", "Note (optional)"),
    orderField,
  ],
  preview: { select: { title: "institutionLabel", subtitle: "degree", media: "logoUpload" } },
});
