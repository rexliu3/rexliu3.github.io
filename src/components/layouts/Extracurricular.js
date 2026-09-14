import React from "react";
import SiteImage from "../SiteImage";

const Extracurricular = ({ data }) => (
  <article className="community-card">
    <div className="community-card__top">
      <SiteImage src={data.logo} alt="" />
      <span>{data.date}</span>
    </div>
    <h3>{data.company}</h3>
    <p className="community-card__role">{data.title}</p>
    {data.description && <p>{data.description[0]}</p>}
    {data.website && (
      <a href={data.website} target="_blank" rel="noopener noreferrer">
        Learn more ↗
      </a>
    )}
  </article>
);

export default Extracurricular;
