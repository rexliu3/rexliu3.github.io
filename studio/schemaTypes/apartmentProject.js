import { defineType } from "sanity";
import { stringField, textField, imageField, orderField } from "./fields";

export const apartmentProject = defineType({
  name: "apartmentProject",
  title: "Apartment side project",
  type: "document",
  fields: [
    stringField("name", "Name"),
    imageField("imageUpload", "Project image"),
    stringField("type", "Kicker"),
    textField("text", "Description"),
    orderField,
  ],
});
