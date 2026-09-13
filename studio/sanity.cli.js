import { defineCliConfig } from "sanity/cli";
import sanityConfig from "../src/sanity/config.json";

export default defineCliConfig({
  api: { projectId: sanityConfig.projectId, dataset: sanityConfig.dataset },
  deployment: { appId: "dv8jjcuudy7ewqybvrj2hcwo" },
});
