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
            className="icon__image"
            style={{strokeWidth: '0'}}
            backgroundImage={data[0]}
            flatTop='True'
            backgroundScale={data.length == 4 && (data[3])}
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
