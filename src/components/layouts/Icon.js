import React from "react";
import Hexagon from 'react-hexagon';

const Icon = (props) => {
  const { data } = props;

/*
[0] : Image Location
[1] : Title
[2] : Subtitle
 */

  return (
    <section className="icon">
        <Hexagon
            className="icon__image"
            style={{strokeWidth: '2', fill: '#63A9AE'}}
            backgroundImage={data[0]}
            flatTop='True'
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
