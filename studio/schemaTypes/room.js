import { defineType } from "sanity";
import { required, stringField, textField, orderField } from "./fields";

export const room = defineType({
  name: "room",
  title: "Apartment room object",
  type: "document",
  fields: [
    stringField("id", "ID", {
      validation: required,
      options: { list: ["books", "travel", "projects", "music", "photos", "berkeley"] },
    }),
    stringField("name", "Name"),
    stringField("short", "Navigation label"),
    stringField("icon", "Icon"),
    stringField("panelTitle", "Panel title"),
    textField("lede", "Panel introduction"),
    orderField,
  ],
  preview: { select: { title: "name", subtitle: "short" } },
});
