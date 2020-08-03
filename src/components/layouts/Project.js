import React from "react";

const Project = (props) => {
  const { data } = props;

/*
[0] : Project Name
[1] : Image Location
[2] : Description
[3] : Tools
[4] : github link
[5] : date
 */

  return (
    <section className="project__grid__item">
        <img className="project__grid__item__image" src={data[1]}></img>
        <div className="project__grid__item__content">
          <h3 className="project__grid__item__content__header">{data[0]}</h3>
          <a href={data[4]} target="_blank">
            <img className="project__grid__item__content__github" src="assets/GitHub-Logo.png"></img>
          </a>
          <p className="project__grid__item__content__date">{data[5]}</p>
          <br></br>
          <p className="project__grid__item__content__descriptor">Description:</p>
          <ul className="project__grid__item__content__description">
            {data[2][0] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][0]}</li>
            )}
            {data[2][1] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][1]}</li>
            )}
            {data[2][2] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][2]}</li>
            )}
            {data[2][3] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][3]}</li>
            )}
            {data[2][4] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][4]}</li>
            )}
          </ul>
          <br></br>
          <p className="project__grid__item__content__descriptor">Tools:&nbsp;</p>
          <p className="project__grid__item__content__tools">{data[3]}</p>
      </div>
    </section>
  );
};

export default Project;
