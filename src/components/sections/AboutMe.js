import React from "react";
import { useSanityContent } from "../../sanity/ContentContext";

const AboutMe = () => {
  const { content } = useSanityContent();
  if (!content) return null;
  const { settings } = content;
  return (
  <div>
    <div className="section-heading">
      <p className="section-kicker">01 · About</p>
      <h2>Curious by nature.<br />Practical by design.</h2>
    </div>
    <div className="about-grid">
      <div className="about-grid__portrait"><img src={settings.profile.portrait} alt={settings.name} /></div>
      <div className="about-grid__copy">
        <p className="about-grid__lead">{settings.profile.aboutLead}</p>
        {settings.profile.aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <div className="about-grid__links">
          <a href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">View résumé ↗</a>
          <a href={`mailto:${settings.email}`}>Email me ↗</a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AboutMe;
