import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchSiteContent } from "./client";

const ContentContext = createContext({ content: null, loading: true, error: null });

export function SanityContentProvider({ children }) {
  const [state, setState] = useState({ content: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetchSiteContent(controller.signal)
      .then(content => setState({ content, loading: false, error: null }))
      .catch(error => {
        if (error.name !== "AbortError") setState({ content: null, loading: false, error });
      });
    return () => controller.abort();
  }, []);

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
}

export function useSanityContent() {
  return useContext(ContentContext);
}
