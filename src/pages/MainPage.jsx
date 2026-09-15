import React from "react";
import ApartmentPage from "./ApartmentPage";
import { useSanityContent } from "../sanity/ContentContext";

export default function MainPage() {
  const { content } = useSanityContent();
  return <ApartmentPage content={content} />;
}
