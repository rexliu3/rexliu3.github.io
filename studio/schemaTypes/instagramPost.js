import { defineField, defineType } from "sanity";
import { required, stringField, urlField } from "./fields";

export const instagramPost = defineType({
  name: "instagramPost",
  title: "Instagram post",
  type: "document",
  fields: [
    stringField("instagramId", "Instagram media ID", { validation: required }),
    stringField("mediaType", "Media type", { validation: required }),
    urlField("mediaUrl", "Media URL"),
    urlField("thumbnailUrl", "Video thumbnail URL"),
    urlField("permalink", "Instagram permalink"),
    defineField({ name: "caption", title: "Caption", type: "text", rows: 3 }),
    defineField({ name: "timestamp", title: "Published at", type: "datetime" }),
    stringField("username", "Username"),
  ],
  preview: {
    select: { title: "caption", subtitle: "timestamp" },
    prepare: ({ title, subtitle }) => ({ title: title || "Instagram post", subtitle }),
  },
});
