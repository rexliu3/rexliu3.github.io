import { defineType } from "sanity";
import { orderField, required, stringField, textField } from "./fields";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    stringField("school", "School", { validation: required }),
    stringField("institutionLabel", "Institution label (optional)"),
    stringField("degree", "Degree or program", { validation: required }),
    stringField("years", "Dates", { validation: required }),
    textField("note", "Note (optional)"),
    orderField,
  ],
  preview: { select: { title: "school", subtitle: "degree" } },
});
