import { defineArrayMember, defineField, defineType } from "sanity";
import { required } from "./fields";

export const photographyPortfolio = defineType({
  name: "photographyPortfolio",
  title: "Photography portfolio",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "Upload, reorder, and caption the images shown in the photography portfolio.",
      of: [
        defineArrayMember({
          name: "portfolioImage",
          title: "Portfolio image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: required,
            }),
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              description: "Describe the image for visitors who cannot see it.",
              validation: required,
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
          ],
          preview: {
            select: { title: "caption", subtitle: "location", media: "image" },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Untitled photograph",
              subtitle,
              media,
            }),
          },
        }),
      ],
      validation: required,
    }),
  ],
  preview: { prepare: () => ({ title: "Photography portfolio" }) },
});
