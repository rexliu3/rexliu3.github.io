import React from "react";
import SiteImage from "../../SiteImage";

export default function PortraitPanel({ room, portrait }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <figure className="portrait-panel-image">
        <SiteImage src={portrait.imageUrl} alt={portrait.alt} />
      </figure>
    </>
  );
}
