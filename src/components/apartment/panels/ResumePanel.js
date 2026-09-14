import React from "react";

function getDownloadUrl(url) {
  if (!url.startsWith("https://cdn.sanity.io/files/")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}dl=Rex-Liu-Resume.pdf`;
}

export default function ResumePanel({ room, content, settings }) {
  const resumeUrl = settings.resumeUrl;
  const isBundledFile = resumeUrl.startsWith("/");

  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <p className="eyebrow resume-preview-label">{content.previewLabel}</p>
      <div className="resume-preview">
        <iframe src={`${resumeUrl}#view=FitH`} title={content.previewTitle} />
      </div>
      <div className="resume-actions">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
          {content.openLabel} <span aria-hidden="true">↗</span>
        </a>
        <a
          href={getDownloadUrl(resumeUrl)}
          download={isBundledFile ? "Rex-Liu-Resume.pdf" : undefined}
        >
          {content.downloadLabel} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </>
  );
}
