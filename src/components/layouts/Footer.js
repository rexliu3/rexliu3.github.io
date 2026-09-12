import React from "react";

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__cta">
      <p className="section-kicker">Have a project in mind?</p>
      <h2>Let’s make something useful.</h2>
      <a className="button button--light" href="mailto:rexliu3@berkeley.edu">
        Start a conversation <span aria-hidden="true">↗</span>
      </a>
    </div>
    <div className="site-footer__bottom">
      <p>© {new Date().getFullYear()} Rex Liu</p>
      <div className="site-footer__links">
        <a href="https://github.com/rexliu3" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/rexliu3" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="/Resume_RexLiu.pdf" target="_blank" rel="noopener noreferrer">Résumé</a>
        <a href="#Home">Back to top ↑</a>
      </div>
    </div>
  </footer>
);

export default Footer;
