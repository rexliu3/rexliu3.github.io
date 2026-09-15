import { defineField, defineType } from "sanity";
import { required } from "./fields";

export const apartmentPortrait = defineType({
  name: "apartmentPortrait",
  title: "Apartment portrait",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      description: "Upload the portrait displayed in the frame beside the Berkeley diploma.",
      options: { hotspot: true },
      validation: required,
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Briefly describe the portrait for visitors who cannot see it.",
      validation: required,
    }),
  ],
  preview: {
    select: { media: "image" },
    prepare: ({ media }) => ({ title: "Apartment portrait", media }),
  },
});
