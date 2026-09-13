import React from "react";
import Icon from "../layouts/Icon";
import { useSanityContent } from "../../sanity/ContentContext";

const Interests = () => {
  const { content } = useSanityContent();
  if (!content) return null;
  const { interests, settings } = content;
  return (
    <div>
      <div className="section-heading">
        <p className="section-kicker">06 · Curiosities</p>
        <h2>
          Things I keep
          <br />
          coming back to.
        </h2>
      </div>
      <div className="interest-grid">
        {interests.map((interest) => (
          <Icon key={interest.name} data={interest} />
        ))}
      </div>
      <div className="profile-notes">
        <div>
          <p className="section-kicker">Languages</p>
          <p>{settings.profile.languages.join(" · ")}</p>
        </div>
        <div>
          <p className="section-kicker">Recognition</p>
          {settings.profile.recognition.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div>
          <p className="section-kicker">Elsewhere</p>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default Interests;
