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
      <img className="icon__image" src={data.logo}></img>

      <h3 className="icon__title">{data.name}</h3>
      <div className="icon__subtitle">{data.description}</div>
    </section>
  );
};

export default Icon;
