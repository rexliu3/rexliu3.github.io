import React from "react";

const Extracurricular = ({ data }) => (
  <article className="community-card">
    <div className="community-card__top">
      <img src={data.logo} alt="" />
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
