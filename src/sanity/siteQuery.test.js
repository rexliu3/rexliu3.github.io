import { expect, test } from "vitest";
import siteQuery from "./siteQuery";

test("requests experiences in reverse chronological CMS order", () => {
  expect(siteQuery).toContain('*[_type == "experience"] | order(order desc)');
});
