import { useSanityContent } from "../sanity/ContentContext";

const EMPTY_ITEMS = [];

/** Read a normalized collection using its canonical content key. */
export default function useCollection(name) {
  const { content, loading, error } = useSanityContent();
  return { items: content?.[name] || EMPTY_ITEMS, loading, error: Boolean(error) };
}
