import React from "react";
import SiteImage from "../../SiteImage";

export default function ProjectsPanel({ room, content, projects, settings }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <div className="apartment-projects">
        {projects.map((project) => (
          <article key={project._id}>
            <SiteImage src={project.image} alt={`${project.name} project preview`} />
            <div>
              <p className="eyebrow">{project.type}</p>
              <h3>{project.name}</h3>
              <p>{project.text}</p>
            </div>
          </article>
        ))}
      </div>
      <a className="panel-link" href={settings.githubUrl} target="_blank" rel="noopener noreferrer">
        {content.linkLabel}
      </a>
    </>
  );
}
