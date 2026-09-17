import React from "react";
import SiteImage from "../../SiteImage";

export default function EducationPanel({ educations = [] }) {
  return (
    <>
      {educations.map((education) => (
        <article className="berkeley-card" key={education._id}>
          <div className="education-institution">
            {education.logo && (
              <SiteImage
                className="education-logo"
                src={education.logo}
                alt={`${education.institutionLabel} logo`}
              />
            )}
            <h3>{education.institutionLabel}</h3>
          </div>
          <div>
            {education.degree} <span>·</span> {education.years}
          </div>
          {education.note && <p className="education-note">{education.note}</p>}
        </article>
      ))}
      {!educations.length && <p className="panel-lede">Education details are not available yet.</p>}
    </>
  );
}
