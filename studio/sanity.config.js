import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import sanityConfig from "../src/sanity/config.json";

const singletonTypes = [
  "resume",
  "photographyPortfolio",
  "apartmentPortrait",
  "bookshelf",
  "topSongs",
];

export default defineConfig({
  name: "rex_internet_apartment",
  title: "Rex’s Internet Apartment",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Bookshelf")
              .id("bookshelf")
              .child(S.document().schemaType("bookshelf").documentId("bookshelf")),
            S.listItem()
              .title("Top songs by year")
              .id("topSongs")
              .child(S.document().schemaType("topSongs").documentId("topSongs")),
            S.listItem()
              .title("Résumé")
              .id("resume")
              .child(S.document().schemaType("resume").documentId("resume")),
            S.listItem()
              .title("Photography portfolio")
              .id("photographyPortfolio")
              .child(
                S.document().schemaType("photographyPortfolio").documentId("photographyPortfolio")
              ),
            S.listItem()
              .title("Apartment portrait")
              .id("apartmentPortrait")
              .child(S.document().schemaType("apartmentPortrait").documentId("apartmentPortrait")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !singletonTypes.includes(item.getId())),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
});
