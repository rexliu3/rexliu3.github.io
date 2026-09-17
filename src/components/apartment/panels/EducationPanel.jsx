import React from "react";

export default function EducationPanel({ educations = [] }) {
  return (
    <>
      {educations.map((education) => (
        <article className="berkeley-card" key={education._id}>
          {education.institutionLabel && <p>{education.institutionLabel}</p>}
          <h3>{education.school}</h3>
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
