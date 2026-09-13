import React from "react";

const Icon = ({ data }) => {
  const content = (
    <>
      <img src={data.logo} alt="" />
      <div>
        <h3>{data.name}</h3>
        {data.description && <p>{data.description}</p>}
      </div>
      {data.link && <span aria-hidden="true">↗</span>}
    </>
  );
  return data.link ? (
    <a className="interest-card" href={data.link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <article className="interest-card">{content}</article>
  );
};

export default Icon;
