import React from "react";
import { Icon } from "./Icon";
import SiteImage from "../SiteImage";

export default function PortfolioOverview({ content, onOpen }) {
  const { settings, experiences } = content;
  const copy = settings.overview;
  const education = content.educations?.[0];

  return (
    <section className="portfolio-overview" aria-labelledby="overview-title" id="out-and-about">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="overview-title">{copy.title}</h2>
        </div>
        <p>{copy.description}</p>
      </div>
      <div className="overview-grid">
        <article className="overview-education">
          <div className="card-topline">
            <span className="eyebrow">01 / EDUCATION</span>
            <Icon name="diploma" />
          </div>
          <h3>{copy.educationTitle}</h3>
          <p>{copy.educationDescription}</p>
          {education && (
            <div className="education-preview">
              {education.logo && (
                <SiteImage className="education-logo" src={education.logo} alt="" />
              )}
              <strong>{education.institutionLabel}</strong>
              <div>{education.degree}</div>
              <small>{education.years}</small>
            </div>
          )}
          <button type="button" className="text-link" onClick={() => onOpen("berkeley")}>
            View education <Icon name="arrow" size={16} />
          </button>
        </article>
        <article className="overview-experience">
          <div className="card-topline">
            <span className="eyebrow">02 / EXPERIENCE</span>
            <Icon name="document" />
          </div>
          <h3>{copy.experienceTitle}</h3>
          <p>{copy.experienceDescription}</p>
          {experiences.length ? (
            <ol className="experience-preview-list">
              {experiences.slice(0, 3).map((experience, index) => (
                <li key={experience._id}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{experience.company}</strong>
                    <small>{experience.title}</small>
                    <small>{experience.date}</small>
                    {experience.note && (
                      <p className="experience-preview-note">{experience.note}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p>{copy.experienceEmpty}</p>
          )}
          <button type="button" className="text-link" onClick={() => onOpen("resume")}>
            Explore my experience <Icon name="arrow" size={16} />
          </button>
        </article>
        <article className="overview-about">
          <div className="card-topline">
            <span className="eyebrow">03 / THE PERSON BEHIND IT</span>
            <Icon name="portrait" />
          </div>
          <h3>{copy.aboutTitle}</h3>
          <p>{copy.aboutDescription}</p>
          <div className="about-note">
            {copy.note}
            <span>— Rex</span>
          </div>
          <button type="button" className="text-link" onClick={() => onOpen("resume")}>
            The work so far <Icon name="arrow" size={16} />
          </button>
        </article>
      </div>
      <div className="contact-note">
        <span>{copy.contactTitle}</span>
        <a href={`mailto:${settings.email}`}>
          Drop me a note <Icon name="arrow" size={18} />
        </a>
      </div>
    </section>
  );
}
