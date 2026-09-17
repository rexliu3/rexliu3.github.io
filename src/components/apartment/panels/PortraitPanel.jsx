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
        <h3>Get in touch</h3>
        <p>
          For work or a conversation, <a href={`mailto:${settings.email}`}>send me an email</a>.
        </p>
      </div>
    </>
  );
}
