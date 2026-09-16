import { defineArrayMember, defineField, defineType } from "sanity";
import { required, stringField, textField, urlField } from "./fields";

const bookList = (name, title) =>
  defineField({
    name,
    title,
    type: "array",
    description: "Add your favorites and drag to reorder them on the bookshelf.",
    of: [
      defineArrayMember({
        name: "favoriteBook",
        title: "Favorite book",
        type: "object",
        fields: [
          stringField("title", "Title", { validation: required }),
          stringField("author", "Author", { validation: required }),
          textField("note", "Personal note"),
          urlField("url", "Book link (optional)"),
        ],
        preview: { select: { title: "title", subtitle: "author" } },
      }),
    ],
  });

export const bookshelf = defineType({
  name: "bookshelf",
  title: "Bookshelf",
  type: "document",
  fields: [bookList("nonfiction", "Favorite nonfiction"), bookList("fiction", "Favorite fiction")],
  preview: { prepare: () => ({ title: "Bookshelf" }) },
});
