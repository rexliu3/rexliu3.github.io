import React from "react";
import SiteImage from "../../SiteImage";
import { Icon } from "../Icon";

export default function BooksPanel({ room, content, nonfictionBooks = [], fictionBooks = [] }) {
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
      {[
        ["Favorite nonfiction", nonfictionBooks],
        ["Favorite fiction", fictionBooks],
      ].map(([title, books]) =>
        books.length ? (
          <section className="favorite-books" key={title} aria-label={title}>
            <h3>{title}</h3>
            {books.map((book) => (
              <article key={book._key || book._id}>
                {book.imageUrl && (
                  <SiteImage
                    className="book-cover"
                    src={book.imageUrl}
                    alt={`Cover of ${book.title}`}
                    loading="lazy"
                  />
                )}
                <div className="book-details">
                  <h4>
                    {book.url ? (
                      <a href={book.url} target="_blank" rel="noopener noreferrer">
                        {book.title} ↗
                      </a>
                    ) : (
                      book.title
                    )}
                  </h4>
                  {book.author && <p className="book-author">by {book.author}</p>}
                  {book.note && <p className="book-note">{book.note}</p>}
                </div>
              </article>
            ))}
          </section>
        ) : null
      )}
      {!nonfictionBooks.length && !fictionBooks.length && (
        <div className="quiet-note">
          <span className="small-star">✳</span>
          <h3>{content.noteTitle}</h3>
          <p>{content.noteBody}</p>
        </div>
      )}
      <a
        className="panel-link"
        href="https://www.goodreads.com/rexliu"
        target="_blank"
        rel="noopener noreferrer"
      >
        My reading list on Goodreads <Icon name="arrow" size={16} />
      </a>
    </>
  );
}
