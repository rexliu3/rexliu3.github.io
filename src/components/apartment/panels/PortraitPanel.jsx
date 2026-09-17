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
          Have something in mind? <a href={`mailto:${settings.email}`}>Drop me a line</a> — work,
          ideas, or a good book recommendation.
        </p>
        <p>
          For the less buttoned-up version, say hi on{" "}
          <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          .
        </p>
      </div>
    </>
  );
}
