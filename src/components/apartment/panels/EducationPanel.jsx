import React from "react";

export default function EducationPanel({ content, settings }) {
  return (
    <>
      <div className="berkeley-card">
        <p>{content.institutionLabel}</p>
        <h3>{content.school}</h3>
        <div>
          {content.degree} <span>·</span> {content.years}
        </div>
      </div>
      <a className="panel-link" href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">
        {content.linkLabel}
      </a>
    </>
  );
}
