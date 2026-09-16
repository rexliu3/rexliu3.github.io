import React from "react";
import SiteImage from "../../SiteImage";

export default function ExperienceItem({ experience }) {
  const { company, date, logo, note, title, website } = experience;

  return (
    <article className="experience-row">
      <div className="experience-row__company">
        {logo ? (
          <SiteImage src={logo} alt="" />
        ) : (
          <span className="experience-row__monogram" aria-hidden="true">
            {company.charAt(0)}
          </span>
        )}
        <div>
          <h3>{company}</h3>
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              Visit company
            </a>
          )}
        </div>
      </div>
      <div className="experience-row__details">
        <p className="experience-row__role">{title}</p>
        <p className="experience-row__date">{date}</p>
        {note && <p className="experience-row__note">{note}</p>}
      </div>
    </article>
  );
}
