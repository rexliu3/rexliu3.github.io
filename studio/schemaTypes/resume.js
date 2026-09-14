import { defineField, defineType } from "sanity";

export const resume = defineType({
  name: "resume",
  title: "Résumé",
  type: "document",
  fields: [
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      description: "Upload the current résumé. The website uses it as soon as you publish.",
      options: { accept: "application/pdf" },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Résumé" }) },
});
