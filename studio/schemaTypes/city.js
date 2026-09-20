import { defineType } from "sanity";
import { stringField, textField, orderField } from "./fields";

export const city = defineType({
  name: "city",
  title: "City lived",
  type: "document",
  fields: [
    stringField("name", "Name"),
    stringField("subtitle", "Subtitle"),
    textField("text", "Story"),
    orderField,
  ],
});
