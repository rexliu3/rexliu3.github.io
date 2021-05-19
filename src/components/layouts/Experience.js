import React from "react";

const Experience = (props) => {
  const { data } = props; 

  return (
    <section className="experience">
         <a href={data.website} target="_blank" 
                rel="noopener noreferrer" >
        <img className="experience__image" src={data.logo}></img>
        </a>
        <div className="experience__content">
          <h3 className="experience__content__header">{data.company}</h3>
          <p className="experience__content__date"><strong>{data.title} |</strong> {data.date}</p>
          <br />
          <ul className="experience__content__description">
            {data.description.map(point =>
               <li className="experience__content__description__item">{point}</li>
               )}
          </ul>
      </div>
    </section>
  );
};

export default Experience;
