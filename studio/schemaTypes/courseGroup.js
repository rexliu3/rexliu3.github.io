import { defineType, defineField, defineArrayMember } from "sanity";
import { stringField, orderField } from "./fields";

export const courseGroup = defineType({
  name: "courseGroup",
  title: "Course group",
  type: "document",
  fields: [
    stringField("title", "Title"),
    defineField({
      name: "courses",
      title: "Courses",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            stringField("shortName", "Course code"),
            stringField("fullName", "Course name"),
            stringField("grade", "Grade"),
          ],
        }),
      ],
    }),
    orderField,
  ],
});
