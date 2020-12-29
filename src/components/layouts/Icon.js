import React from "react";
import Hexagon from 'react-hexagon';

const Icon = (props) => {
  const { data } = props;

/*
[0] : Image Location
[1] : Title
[2] : Subtitle
[3] : Background Scale
 */

  return (
    <section className="icon">
        <Hexagon
            className="icon__image__outer"
            style={{strokeWidth: '0', fill: ' #63A9AE'}}
            flatTop='True'
            children = {
              <Hexagon className="icon__image__inner" backgroundImage="assets/leads.png" 
                backgroundScale='0.5'
                flatTop='True'
                backgroundHeight="4"
                backgroundWidth="4"
              ></Hexagon>
            }
        />
        
        <h3 className="icon__title">
            {data[1]}
        </h3>
        <div className="icon__subtitle">
            {data[2]}
        </div>
    </section>
  );
};

export default Icon;
