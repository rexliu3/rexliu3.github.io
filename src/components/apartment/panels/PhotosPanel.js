import React from "react";
import SiteImage from "../../SiteImage";

function getPostLabel(post) {
  const caption = post.caption.trim();
  if (caption) return caption.length > 120 ? `${caption.slice(0, 117)}…` : caption;
  return post.username ? `Instagram post by @${post.username}` : "View post on Instagram";
}

function getPostDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    date
  );
}

export default function PhotosPanel({ room, content, posts = [] }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      {posts.length ? (
        <>
          <p className="eyebrow instagram-feed-label">{content.feedLabel}</p>
          <div className="instagram-gallery">
            {posts.map((post) => {
              const label = getPostLabel(post);
              const postDate = getPostDate(post.timestamp);
              return (
                <a
                  key={post.instagramId}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} — ${content.instagramLinkLabel}`}
                >
                  <span className="instagram-gallery__image">
                    <SiteImage
                      src={post.thumbnailUrl || post.mediaUrl}
                      alt={label}
                      loading="lazy"
                    />
                    {post.mediaType === "VIDEO" && (
                      <span className="instagram-gallery__type" aria-hidden="true">
                        ▶
                      </span>
                    )}
                  </span>
                  <span className="instagram-gallery__caption">{label}</span>
                  {postDate && <time dateTime={post.timestamp}>{postDate}</time>}
                </a>
              );
            })}
          </div>
        </>
      ) : (
        <figure className="photo-print">
          <SiteImage src={content.image} alt={content.imageAlt} />
          <figcaption>
            {content.caption} <span>{content.byline}</span>
          </figcaption>
        </figure>
      )}
      <div className="quiet-note">
        <h3>{content.noteTitle}</h3>
        <p>{content.noteBody}</p>
      </div>
    </>
  );
}
