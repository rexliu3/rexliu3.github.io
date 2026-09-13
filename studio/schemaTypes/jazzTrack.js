import { defineType } from "sanity";
import { required, stringField, orderField } from "./fields";

export const jazzTrack = defineType({
  name: "jazzTrack",
  title: "Jazz track",
  type: "document",
  fields: [
    stringField("id", "ID", { validation: required }),
    stringField("title", "Title"),
    stringField("mood", "Mood"),
    stringField("duration", "Duration"),
    stringField("color", "Record color"),
    stringField("src", "Audio path", { validation: required }),
    orderField,
  ],
});
