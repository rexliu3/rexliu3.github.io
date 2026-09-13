import React from "react";
import ApartmentPage from "./ApartmentPage";
import { useSanityContent } from "../../sanity/ContentContext";

export default function MainPage() {
  const { content, loading, error } = useSanityContent();
  if (loading) {
    return (
      <main className="apartment-site">
        <p className="collection-status" role="status">
          Opening Rex’s apartment…
        </p>
      </main>
    );
  }
  if (error || !content) {
    return (
      <main className="apartment-site">
        <p className="collection-status" role="alert">
          The apartment is unavailable right now. Please try again soon.
        </p>
      </main>
    );
  }
  return <ApartmentPage content={content} />;
}
