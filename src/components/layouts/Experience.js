import React from "react";
import Card from '@material-ui/core/Card';

const Experience = (props) => {
  const { data } = props; 

  return (
    <Card className="experience">
         <a href={data.website} target="_blank" 
                rel="noopener noreferrer" >
        <img className="experience__image" src={data.logo}></img>
        </a>
        <div className="experience__content">
          <h3 className="experience__content__header">{data.company}</h3>
          <p className="experience__content__date"><strong style={{color:"#63A9AE"}}>{data.title} |</strong> <br id="break"/> {data.date}</p>
          <br />
          <ul className="experience__content__description">
            {data.description.map(point =>
               <li className="experience__content__description__item">{point}</li>
               )}
          </ul>
      </div>
    </Card>
  );
};

export default Experience;
