import React from "react";
import SiteImage from "../SiteImage";

const Experience = ({ data }) => (
  <article className="experience-row">
    <div className="experience-row__company">
      {data.logo ? (
        <SiteImage src={data.logo} alt="" />
      ) : (
        <span className="experience-row__monogram" aria-hidden="true">
          {data.company.charAt(0)}
        </span>
      )}
      <div>
        <h3>{data.company}</h3>
        {data.website && (
          <a href={data.website} target="_blank" rel="noopener noreferrer">
            Visit company ↗
          </a>
        )}
      </div>
    </div>
    <div className="experience-row__details">
      <p className="experience-row__role">{data.title}</p>
      <p className="experience-row__date">{data.date}</p>
      {data.description && (
        <ul>
          {data.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  </article>
);

export default Experience;
