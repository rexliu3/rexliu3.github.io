import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchSiteContent } from "./client";

const ContentContext = createContext(null);

export function SanityContentProvider({ children }) {
  const [state, setState] = useState({ content: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetchSiteContent(controller.signal)
      .then((content) => {
        if (!controller.signal.aborted) setState({ content, loading: false, error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ content: null, loading: false, error });
      });
    return () => controller.abort();
  }, []);

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
}

export function useSanityContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useSanityContent must be used within SanityContentProvider");
  return context;
}
