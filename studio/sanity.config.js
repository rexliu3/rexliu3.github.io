import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "rex_internet_apartment",
  title: "Rex’s Internet Apartment",
  projectId: "xvwhy7q4",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
