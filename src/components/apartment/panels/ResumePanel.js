import React from "react";
import ExperienceItem from "./ExperienceItem";

function getDownloadUrl(url) {
  if (!url.startsWith("https://cdn.sanity.io/files/")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}dl=Rex-Liu-Resume.pdf`;
}

export default function ResumePanel({ room, content, experiences = [], settings }) {
  const resumeUrl = settings.resumeUrl;
  const isBundledFile = resumeUrl.startsWith("/");

  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <p className="eyebrow resume-experience-label">PAST EXPERIENCE</p>
      <div className="resume-experience-list" aria-label="Past experience">
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <ExperienceItem key={experience._id} experience={experience} />
          ))
        ) : (
          <p className="resume-experience-empty">Experience details are unavailable right now.</p>
        )}
      </div>
      <div className="resume-actions">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
          {content.openLabel}
        </a>
        <a
          href={getDownloadUrl(resumeUrl)}
          download={isBundledFile ? "Rex-Liu-Resume.pdf" : undefined}
        >
          {content.downloadLabel}
        </a>
      </div>
    </>
  );
}
