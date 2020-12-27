import React from "react";

const Experience = (props) => {
  const { data } = props;

/*
[0] : Company
[1] : Logo Location
[2] : Position Name
[3] : Date
[4] : Website Link
[5] : Description (list)
 */

  return (
    <section className="experience">
         <a href={data[4]} target="_blank" 
                rel="noopener noreferrer" >
        <img className="experience__image" src={data[1]}></img>
        </a>
        <div className="experience__content">
          <h3 className="experience__content__header">{data[0]}</h3>
          <p className="experience__content__date">{data[3]}</p>
          <br />
          <ul className="experience__content__description">
            {data[5][0] !== "" && (
               <li className="experience__content__description__item">{data[5][0]}</li>
            )}
            {data[5][1] !== "" && (
               <li className="experience__content__description__item">{data[5][1]}</li>
            )}
            {data[5][2] !== "" && (
               <li className="experience__content__description__item">{data[5][2]}</li>
            )}
            {data[5][3] !== "" && (
               <li className="experience__content__description__item">{data[5][3]}</li>
            )}
            {data[5][4] !== "" && (
               <li className="experience__content__description__item">{data[5][4]}</li>
            )}
          </ul>
      </div>
    </section>
  );
};

export default Experience;
