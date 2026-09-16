import normalizeContent from "./normalizeContent";
import fallbackContent from "./fallbackContent";

const normalize = (content) => normalizeContent({ contentModel: "dynamic-v1", ...content });

test("rejects executable CMS links and retains valid project destinations", () => {
  const content = normalize({
    resumeUrl: "javascript:alert(1)",
    apartmentProjects: [
      { name: "Demo", url: "https://example.com/demo", sourceUrl: "javascript:alert(1)" },
    ],
    experiences: [{ website: "data:text/html,hello" }],
    apartmentPortrait: { imageUrl: "//unknown.example/photo.jpg" },
  });
  expect(content.settings.resumeUrl).toBe(fallbackContent.settings.resumeUrl);
  expect(content.apartmentProjects[0].url).toBe("https://example.com/demo");
  expect(content.apartmentProjects[0].sourceUrl).toBe("");
  expect(content.experiences[0].website).toBe("");
  expect(content.apartmentPortrait.imageUrl).toBe(fallbackContent.apartmentPortrait.imageUrl);
});

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
  expect(content.jazzTracks).toEqual(fallbackContent.jazzTracks);
});

test("uses the bundled résumé and preserves an intentionally empty collection", () => {
  const content = normalize({ resumeUrl: null, cities: [] });
  expect(content.settings.resumeUrl).toBe(fallbackContent.settings.resumeUrl);
  expect(content.cities).toEqual([]);
});

test("keeps the bundled music collection", () => {
  const content = normalize({
    jazzTracks: [{ id: "record", src: "/audio/record.mp3" }, { id: "missing-source" }, null],
  });
  expect(content.jazzTracks).toEqual(fallbackContent.jazzTracks);
});

test("uses a single experience note and migrates legacy highlights", () => {
  expect(
    normalize({ experiences: [{ note: "Building useful software." }] }).experiences[0].note
  ).toBe("Building useful software.");
  expect(
    normalize({ experiences: [{ description: ["First point.", "Second point."] }] }).experiences[0]
      .note
  ).toBe("First point. Second point.");
});

test("keeps only photography portfolio entries with an image and alternative text", () => {
  const content = normalize({
    photographyPhotos: [
      { _key: "valid", imageUrl: "https://cdn.example.com/photo.jpg", alt: "A city street" },
      { _key: "missing-alt", imageUrl: "https://cdn.example.com/photo-2.jpg" },
      { _key: "missing-image", alt: "A mountain" },
    ],
  });

  expect(content.photographyPhotos).toEqual([
    {
      _id: "photographyPhotos-0",
      _key: "valid",
      order: 0,
      imageUrl: "https://cdn.example.com/photo.jpg",
      alt: "A city street",
      caption: "",
      location: "",
    },
  ]);
});

test("accepts an uploaded apartment portrait and falls back to the bundled portrait", () => {
  const uploaded = normalize({
    apartmentPortrait: {
      imageUrl: "https://cdn.sanity.io/images/example/portrait.jpg",
      alt: "Rex smiling",
    },
  });
  expect(uploaded.apartmentPortrait).toEqual({
    imageUrl: "https://cdn.sanity.io/images/example/portrait.jpg",
    alt: "Rex smiling",
  });

  expect(normalize({ apartmentPortrait: null }).apartmentPortrait).toEqual(
    fallbackContent.apartmentPortrait
  );
});
