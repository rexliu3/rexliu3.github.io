import { defineType } from "sanity";
import { stringField, textField, orderField } from "./fields";

export const city = defineType({
  name: "city",
  title: "City lived",
  type: "document",
  fields: [
    stringField("name", "Name"),
    stringField("label", "Chapter label"),
    stringField("subtitle", "Subtitle"),
    textField("text", "Story"),
    stringField("illustration", "Illustration", {
      options: { list: ["vancouver", "san-francisco", "new-york"] },
    }),
    stringField("illustrationAlt", "Illustration alt text"),
    orderField,
  ],
});
