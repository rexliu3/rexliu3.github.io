import React from "react";

export default function BooksPanel({ room, content }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      <div className="book-vignette" aria-hidden="true">
        {content.spines.map((spine) => (
          <div className="decorative-book" key={spine}>
            {spine}
          </div>
        ))}
      </div>
      <div className="quiet-note">
        <span className="small-star">✳</span>
        <h3>{content.noteTitle}</h3>
        <p>{content.noteBody}</p>
      </div>
    </>
  );
}
