import { defineType } from "sanity";
import { stringField, textField, orderField } from "./fields";

export const apartmentProject = defineType({
  name: "apartmentProject",
  title: "Apartment side project",
  type: "document",
  fields: [
    stringField("name", "Name"),
    stringField("image", "Image path"),
    stringField("type", "Kicker"),
    textField("text", "Description"),
    orderField,
  ],
});
