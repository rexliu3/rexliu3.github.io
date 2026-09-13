import { useSanityContent } from "../sanity/ContentContext";

const collectionKeys = {
  Experiences: "experiences",
  Projects: "projects",
  Courses: "courseGroups",
  Extracurriculars: "extracurriculars",
};

const useCollection = (name) => {
  const { content, loading, error } = useSanityContent();
  const key = collectionKeys[name];
  return { items: content && key ? content[key] || [] : [], loading, error: Boolean(error) };
};

export default useCollection;
