import React from "react";

const AboutMe = () => (
  <div>
    <div className="section-heading">
      <p className="section-kicker">01 · About</p>
      <h2>Curious by nature.<br />Practical by design.</h2>
    </div>
    <div className="about-grid">
      <div className="about-grid__portrait"><img src="assets/Profile-Picture.png" alt="Rex Liu" /></div>
      <div className="about-grid__copy">
        <p className="about-grid__lead">I’m a UC Berkeley computer science graduate based in New York and working at Palantir Technologies.</p>
        <p>My experience spans frontend and backend development, mobile apps, data, and leading engineering teams. I enjoy turning ambitious ideas into clear, dependable software that solves meaningful problems.</p>
        <p>Away from a screen, you’ll usually find me studying chess positions, playing tennis, or competing on a badminton court.</p>
        <div className="about-grid__links">
          <a href="/Resume_RexLiu.pdf" target="_blank" rel="noopener noreferrer">View résumé ↗</a>
          <a href="mailto:rexliu3@berkeley.edu">Email me ↗</a>
          <a href="https://www.linkedin.com/in/rexliu3" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>
    </div>
  </div>
);

export default AboutMe;
