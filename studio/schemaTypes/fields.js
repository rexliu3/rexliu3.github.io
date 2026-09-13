import { defineArrayMember, defineField } from "sanity";

export const required = (Rule) => Rule.required();
export const stringField = (name, title, extra = {}) =>
  defineField({ name, title, type: "string", ...extra });
export const textField = (name, title, extra = {}) =>
  defineField({ name, title, type: "text", rows: 3, ...extra });
export const urlField = (name, title) => defineField({ name, title, type: "url" });
export const orderField = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  validation: required,
});
export const stringArray = (name, title) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })] });

export const panelObject = (name, title, fields) =>
  defineField({ name, title, type: "object", fields });
