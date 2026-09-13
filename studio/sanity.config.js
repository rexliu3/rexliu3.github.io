import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import sanityConfig from "../src/sanity/config.json";

export default defineConfig({
  name: "rex_internet_apartment",
  title: "Rex’s Internet Apartment",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
