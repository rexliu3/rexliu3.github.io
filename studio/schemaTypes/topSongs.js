import { defineArrayMember, defineField, defineType } from "sanity";
import { required, stringField, urlField } from "./fields";

export const topSongs = defineType({
  name: "topSongs",
  title: "Top songs by year",
  type: "document",
  fields: [
    defineField({
      name: "years",
      title: "Years",
      type: "array",
      description: "Add a year, then add your favorite songs from that year.",
      of: [
        defineArrayMember({
          name: "songYear",
          title: "Year",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "number",
              validation: (Rule) => Rule.required().integer().min(1900).max(2100),
            }),
            defineField({
              name: "songs",
              title: "Top songs",
              type: "array",
              of: [
                defineArrayMember({
                  name: "song",
                  title: "Song",
                  type: "object",
                  fields: [
                    stringField("title", "Song title", { validation: required }),
                    stringField("artist", "Artist", { validation: required }),
                    urlField("spotifyUrl", "Spotify link (optional)"),
                  ],
                  preview: {
                    select: { title: "title", subtitle: "artist" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { year: "year", songs: "songs" },
            prepare: ({ year, songs }) => ({
              title: year ? String(year) : "Untitled year",
              subtitle: `${songs?.length || 0} song${songs?.length === 1 ? "" : "s"}`,
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((years) => {
          if (!years) return true;
          const values = years.map(({ year }) => year).filter(Number.isInteger);
          return new Set(values).size === values.length || "Each year can only appear once.";
        }),
    }),
  ],
  preview: { prepare: () => ({ title: "Top songs by year" }) },
});
