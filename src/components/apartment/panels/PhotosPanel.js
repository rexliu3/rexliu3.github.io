import React from "react";
import SiteImage from "../../SiteImage";

export default function PhotosPanel({ room, content, photos = [] }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      {photos.length ? (
        <>
          <p className="eyebrow photography-gallery-label">{content.portfolioLabel}</p>
          <div className="photography-gallery">
            {photos.map((photo) => (
              <figure key={photo._key}>
                <SiteImage src={photo.imageUrl} alt={photo.alt} loading="lazy" />
                {(photo.caption || photo.location) && (
                  <figcaption>
                    {photo.caption && <span>{photo.caption}</span>}
                    {photo.location && <small>{photo.location}</small>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      ) : (
        <div className="quiet-note photography-empty">
          <h3>{content.noteTitle}</h3>
          <p>{content.noteBody}</p>
        </div>
      )}
    </>
  );
}
