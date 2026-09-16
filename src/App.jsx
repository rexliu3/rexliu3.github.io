import React from "react";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import { SanityContentProvider } from "./sanity/ContentContext";

const App = () => (
  <SanityContentProvider>
    {window.location.pathname === "/" ? <MainPage /> : <NotFoundPage />}
  </SanityContentProvider>
);

export default App;
