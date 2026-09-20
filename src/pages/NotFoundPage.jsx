import React from "react";
import useTheme from "../hooks/useTheme";

const NotFoundPage = () => {
  useTheme();
  return (
    <main className="not-found">
      <p className="section-kicker">404 · Page not found</p>
      <h1>
        There’s nothing
        <br />
        here yet.
      </h1>
      <a className="button button--primary" href="/">
        Return home
      </a>
    </main>
  );
};

export default NotFoundPage;
