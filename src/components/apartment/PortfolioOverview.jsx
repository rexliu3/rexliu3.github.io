import React from "react";
import { Icon } from "./Icon";
import SiteImage from "../SiteImage";

export default function PortfolioOverview({ content, onOpen }) {
  const { settings, apartmentProjects, cities } = content;
  const copy = settings.overview;

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
        <article className="overview-work">
          <div className="card-topline">
            <span className="eyebrow">01 / THE WORKBENCH</span>
            <Icon name="laptop" />
          </div>
          <h3>{copy.projectsTitle}</h3>
          <p>{copy.projectsDescription}</p>
          <div className="project-preview-list">
            {apartmentProjects.slice(0, 3).map((project) => (
              <button type="button" key={project._id} onClick={() => onOpen("projects")}>
                <SiteImage src={project.image} alt="" loading="lazy" />
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.type}</small>
                </span>
                <Icon name="arrow" size={17} />
              </button>
            ))}
            {!apartmentProjects.length && <p>More experiments are on the way.</p>}
          </div>
          <a
            className="text-link"
            href={settings.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore GitHub <Icon name="arrow" size={16} />
          </a>
        </article>
        <article className="overview-journey">
          <div className="card-topline">
            <span className="eyebrow">02 / OUT IN THE WORLD</span>
            <Icon name="globe" />
          </div>
          <h3>{copy.travelTitle}</h3>
          <p>{copy.travelDescription}</p>
          <ol className="journey-stops">
            {cities.map((city, index) => (
              <li key={city._id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{city.name}</strong>
                  <small>{city.subtitle}</small>
                </div>
              </li>
            ))}
          </ol>
          <button type="button" className="text-link" onClick={() => onOpen("travel")}>
            Follow the journey <Icon name="arrow" size={16} />
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
