import React from "react";

const Project = ({ data, index }) => (
  <article className="project-card">
    <div className="project-card__visual">
      <img src={data.image || data.logo} alt="" />
      <span>{String(index + 1).padStart(2, "0")}</span>
    </div>
    <div className="project-card__body">
      <div className="project-card__title-row">
        <div><p className="project-card__date">{data.date}</p><h3>{data.name}</h3></div>
        <div className="project-card__links">
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
          {data.link && <a href={data.link} target="_blank" rel="noopener noreferrer">Live ↗</a>}
        </div>
      </div>
      <p className="project-card__summary">{data.summary}</p>
      {data.tools && <ul className="tag-list" aria-label="Technologies">{data.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>}
      {data.description && (
        <details className="project-card__details">
          <summary>Project details <span aria-hidden="true">+</span></summary>
          <ul>{data.description.map((point, pointIndex) => <li key={pointIndex}>{point}</li>)}</ul>
        </details>
      )}
    </div>
  </article>
);

export default Project;
