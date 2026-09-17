import { defineField, defineType } from "sanity";
import { required, stringField } from "./fields";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const cityVisited = defineType({
  name: "cityVisited",
  title: "Cities visited",
  type: "document",
  fields: [
    stringField("name", "City", { validation: required }),
    defineField({
      name: "month",
      title: "Month visited",
      type: "number",
      options: { list: months.map((title, index) => ({ title, value: index + 1 })) },
      validation: (Rule) => Rule.required().integer().min(1).max(12),
    }),
    defineField({
      name: "year",
      title: "Year visited",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: "location",
      title: "Map location",
      type: "geopoint",
      description:
        "Enter the city’s latitude and longitude to position its marker on the world map.",
      validation: (Rule) =>
        Rule.required().custom((point) =>
          point &&
          Number.isFinite(point.lat) &&
          Math.abs(point.lat) <= 90 &&
          Number.isFinite(point.lng) &&
          Math.abs(point.lng) <= 180
            ? true
            : "Enter a valid latitude (−90 to 90) and longitude (−180 to 180)."
        ),
    }),
  ],
  preview: {
    select: { title: "name", month: "month", year: "year" },
    prepare: ({ title, month, year }) => ({
      title,
      subtitle: `${months[month - 1] || "Month not set"} ${year || ""}`,
    }),
  },
});
