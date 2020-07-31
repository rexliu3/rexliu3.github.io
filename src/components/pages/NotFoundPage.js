import React from "react";

const NotFoundPage = () => (
  <section className="notfound">
    <div className="notfound__content">
      <h1 className="notfound__content__label">Wrong Page</h1>
      <a href="/" className="notfound__content__link">
        <button className="btn-sm notfound__content__button">Go Home</button>
      </a>
    </div>
  </section>
);

export default NotFoundPage;
