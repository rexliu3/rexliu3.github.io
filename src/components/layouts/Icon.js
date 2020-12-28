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
        <div classNmae="hex-wrap">
          <div className="hexagon">
              <div className="hexagon__before" />
              <img className="hexagon__image" src= {data[0]}/>
              <div className="hexagon__after" />
          </div>
        </div>
        
        {/*
        <Hexagon
            className="icon__image__outer"
            style={{strokeWidth: '0', fill: ' #63A9AE', height: '25vw'}}
            flatTop='True'
            hexProps={
              className="icon__image__outer"
            }
            children = {
              <Hexagon
                className="icon__image__inner"
                style={{strokeWidth: '0'}}
                backgroundImage={data[0]}
                flatTop='True'
                backgroundScale={data.length == 4 && (data[3])}
              />
            }
        />*/}
        
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
