import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import sanityConfig from "../src/sanity/config.json";

export default defineConfig({
  name: "rex_internet_apartment",
  title: "Rex’s Internet Apartment",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Résumé")
              .id("resume")
              .child(S.document().schemaType("resume").documentId("resume")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== "resume"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== "resume"),
  },
});
