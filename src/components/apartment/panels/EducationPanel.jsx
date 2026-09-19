import React from "react";
import SiteImage from "../../SiteImage";

export default function EducationPanel({ room, educations = [] }) {
  return (
    <>
      {room?.lede && <p className="panel-lede">{room.lede}</p>}
      {educations.length > 0 && (
        <div className="education-list">
          {educations.map((education, index) => (
            <article className="berkeley-card" key={education._id}>
              <div className="education-card-heading">
                <span className="education-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="education-years">{education.years}</span>
              </div>
              <div className="education-institution">
                {education.logo ? (
                  <SiteImage
                    className="education-logo"
                    src={education.logo}
                    alt={`${education.institutionLabel} logo`}
                  />
                ) : (
                  <span className="education-monogram" aria-hidden="true">
                    {education.institutionLabel?.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="education-label">Institution</p>
                  <h3>{education.institutionLabel}</h3>
                </div>
              </div>
              <div className="education-degree">
                <span>Area of study</span>
                <strong>{education.degree}</strong>
              </div>
              {education.note && (
                <div className="education-note">
                  <span>What stayed with me</span>
                  <p>{education.note}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      {!educations.length && <p className="panel-lede">Education details are not available yet.</p>}
    </>
  );
}
