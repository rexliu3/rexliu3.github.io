import normalizeContent from "./normalizeContent";
import fallbackContent from "./fallbackContent";

const normalize = (content) => normalizeContent({ contentModel: "dynamic-v1", ...content });

test("keeps website copy and room metadata local while accepting a hosted résumé", () => {
  const content = normalize({
    settings: { brand: "Updated brand", panels: { books: { noteTitle: "New books" } } },
    rooms: [{ id: "books", name: "My library", order: 2 }],
    resumeUrl: "https://cdn.sanity.io/files/example/resume.pdf",
    jazzTracks: [null, { id: "broken" }],
  });
  expect(content.settings.brand).toBe(fallbackContent.settings.brand);
  expect(content.settings.panels.books).toEqual(fallbackContent.settings.panels.books);
  expect(content.settings.resumeUrl).toBe("https://cdn.sanity.io/files/example/resume.pdf");
  expect(content.rooms).toEqual(fallbackContent.rooms);
  expect(content.jazzTracks).toEqual([]);
});

test("uses the bundled résumé and preserves an intentionally empty collection", () => {
  const content = normalize({ resumeUrl: null, cities: [] });
  expect(content.settings.resumeUrl).toBe(fallbackContent.settings.resumeUrl);
  expect(content.cities).toEqual([]);
});

test("normalizes nested courses and keeps only playable music", () => {
  const content = normalize({
    courseGroups: [
      {
        title: "Computer science",
        order: Infinity,
        courses: [null, { shortName: "CS 61A", grade: 42 }],
      },
    ],
    jazzTracks: [{ id: "record", src: "/audio/record.mp3" }, { id: "missing-source" }, null],
  });
  expect(content.courseGroups[0]).toEqual({
    _id: "courseGroups-0",
    order: 0,
    title: "Computer science",
    courses: [{ _key: "", shortName: "CS 61A", fullName: "", grade: "" }],
  });
  expect(content.jazzTracks).toHaveLength(1);
  expect(content.jazzTracks[0]).toMatchObject({ id: "record", src: "/audio/record.mp3" });
});

test("keeps only Instagram posts that have a link and displayable media", () => {
  const content = normalize({
    instagramPosts: [
      {
        instagramId: "image",
        mediaType: "IMAGE",
        mediaUrl: "https://cdn.example.com/image.jpg",
        permalink: "https://www.instagram.com/p/image/",
      },
      {
        instagramId: "video",
        mediaType: "VIDEO",
        thumbnailUrl: "https://cdn.example.com/video.jpg",
        permalink: "https://www.instagram.com/reel/video/",
      },
      { instagramId: "missing-media", permalink: "https://www.instagram.com/p/missing/" },
      { instagramId: "missing-link", mediaUrl: "https://cdn.example.com/orphan.jpg" },
    ],
  });

  expect(content.instagramPosts.map((post) => post.instagramId)).toEqual(["image", "video"]);
});
