import React from "react";
import SiteImage from "../../SiteImage";

export default function PortraitPanel({ room, portrait, settings }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <figure className="portrait-panel-image">
        <SiteImage src={portrait.imageUrl} alt={portrait.alt} />
      </figure>
      <div className="portrait-panel-invitation">
        <h3>Your turn.</h3>
        <p>
          Don’t be a stranger — <a href={`mailto:${settings.email}`}>say hello by email</a>. Then
          poke around the apartment and click whatever catches your eye.
        </p>
      </div>
    </>
  );
}
