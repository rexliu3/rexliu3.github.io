import React from "react";
import SiteImage from "../../SiteImage";

export default function PhotosPanel({ room, content }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <figure className="photo-print">
        <SiteImage src={content.image} alt={content.imageAlt} />
        <figcaption>
          {content.caption} <span>{content.byline}</span>
        </figcaption>
      </figure>
      <div className="quiet-note">
        <h3>{content.noteTitle}</h3>
        <p>{content.noteBody}</p>
      </div>
    </>
  );
}
