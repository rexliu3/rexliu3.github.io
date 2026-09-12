import React from "react";

import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";
import Extracurriculars from "../sections/Extracurriculars";
import Courses from "../sections/Courses";
import Interests from "../sections/Interests";

const MainPage = () => (
  <main className="site-shell">
    <Navbar />

    <header className="hero" id="Home">
      <div className="hero__eyebrow">
        <span className="status-dot" aria-hidden="true" />
        Software engineer · New York
      </div>
      <h1>I build thoughtful<br />digital products.</h1>
      <p className="hero__lede">
        I’m Rex Liu, a software engineer at Palantir Technologies and UC
        Berkeley alum interested in building useful, dependable technology.
      </p>
      <div className="hero__actions">
        <a className="button button--primary" href="#Projects">Explore my work <span aria-hidden="true">↗</span></a>
        <a className="button button--secondary" href="mailto:rexliu3@berkeley.edu">Get in touch</a>
      </div>
      <a className="hero__scroll" href="#AboutMe">Scroll to discover <span aria-hidden="true">↓</span></a>
    </header>

    <div className="page-content">
      <section className="content-section" id="AboutMe"><AboutMe /></section>
      <section className="content-section" id="Experiences"><Experiences /></section>
      <section className="content-section" id="Projects"><Projects /></section>
      <section className="content-section" id="Extracurriculars"><Extracurriculars /></section>
      <section className="content-section" id="Courses"><Courses /></section>
      <section className="content-section" id="Interests"><Interests /></section>
    </div>

    <Footer />
  </main>
);

export default MainPage;
