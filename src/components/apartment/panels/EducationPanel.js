import React from "react";

export default function EducationPanel({ room, content, settings }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <div className="berkeley-card">
        <span className="berkeley-seal">{content.seal}</span>
        <p>{content.institutionLabel}</p>
        <h3>{content.school}</h3>
        <div>
          {content.degree} <span>·</span> {content.years}
        </div>
      </div>
      <div className="berkeley-story">
        <h3>{content.storyTitle}</h3>
        {content.storyParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <a className="panel-link" href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">
        {content.linkLabel}
      </a>
    </>
  );
}
