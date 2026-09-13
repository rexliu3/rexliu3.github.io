import { defineType } from "sanity";
import { stringField, textField, urlField, orderField } from "./fields";

export const interest = defineType({
  name: "interest",
  title: "Interest",
  type: "document",
  fields: [
    stringField("name", "Name"),
    stringField("logo", "Icon path"),
    textField("description", "Description"),
    urlField("link", "Link"),
    orderField,
  ],
});
