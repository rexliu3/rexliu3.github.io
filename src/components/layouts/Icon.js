import React from "react";
import Hexagon from "react-hexagon";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import Ic from "@mdi/react";
import { mdiAccountMultiplePlus } from "@mdi/js";

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
      {/*<Hexagon
            className="icon__image__outer"
            data-animation="flip-in-x"
            style={{strokeWidth: '0', zIndex: '999'}}
            backgroundImage="assets/leader.gif"
            flatTop='True'
            backgroundScale='0.97'
            style={{marginLeft: '5vw'}}
      />*/}
      <img className="icon__image" src={data[0]}></img>

      <h3 className="icon__title">{data[1]}</h3>
      <div className="icon__subtitle">{data[2]}</div>
    </section>
  );
};

export default Icon;
