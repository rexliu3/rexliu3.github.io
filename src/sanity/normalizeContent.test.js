import normalizeContent from "./normalizeContent";
import fallbackContent from "./fallbackContent";

test("fills missing panel settings and hotspot metadata without replacing live copy", () => {
  const content = normalizeContent({
    settings: { brand: "Updated brand", panels: { books: { noteTitle: "New books" } } },
    rooms: [{ id: "books", name: "My library", order: 2 }],
    jazzTracks: [null, { id: "broken" }],
  });
  expect(content.settings.brand).toBe("Updated brand");
  expect(content.settings.panels.books.noteTitle).toBe("New books");
  expect(content.settings.panels.books.spines).toEqual(
    fallbackContent.settings.panels.books.spines
  );
  expect(content.rooms).toHaveLength(6);
  expect(content.rooms.find((room) => room.id === "books").name).toBe("My library");
  expect(content.jazzTracks).toEqual([]);
});

test("preserves intentional empty fields and rejects invalid field types", () => {
  const content = normalizeContent({
    settings: { introLines: [], signature: "", asideLines: [null, "Hello"], panels: null },
    cities: [],
  });
  expect(content.settings.introLines).toEqual([]);
  expect(content.settings.signature).toBe("");
  expect(content.settings.asideLines).toEqual(["Hello"]);
  expect(content.settings.panels).toEqual(fallbackContent.settings.panels);
  expect(content.cities).toEqual([]);
});
