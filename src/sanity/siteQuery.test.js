import { expect, test } from "vitest";
import siteQuery from "./siteQuery";

test("requests experiences in reverse chronological CMS order", () => {
  expect(siteQuery).toContain('*[_type == "experience"] | order(order desc)');
});

test("requests education in descending CMS display order", () => {
  expect(siteQuery).toContain('*[_type == "education"] | order(order desc)');
});

test("requests the yearly top songs from the music singleton", () => {
  expect(siteQuery).toContain('*[_type == "topSongs" && _id == "topSongs"][0].years[]');
  expect(siteQuery).toContain("songs[]{_key, title, artist, spotifyUrl}");
});
