import React from "react";

const NotFoundPage = () => (
  <main className="not-found">
    <p className="section-kicker">404 · Page not found</p>
    <h1>
      There’s nothing
      <br />
      here yet.
    </h1>
    <a className="button button--primary" href="/">
      Return home <span aria-hidden="true">↗</span>
    </a>
  </main>
);

export default NotFoundPage;
