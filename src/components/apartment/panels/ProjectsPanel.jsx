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
              {(project.url || project.sourceUrl) && (
                <div className="project-links">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit project ↗
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Source code ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      {!projects.length && (
        <p className="quiet-note">
          New experiments are on the way. In the meantime, take a look around GitHub.
        </p>
      )}
      <a className="panel-link" href={settings.githubUrl} target="_blank" rel="noopener noreferrer">
        {content.linkLabel}
      </a>
    </>
  );
}
