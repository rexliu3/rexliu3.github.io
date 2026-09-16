import React from "react";
import { Icon } from "../Icon";
import { safeUrl } from "../../../utils/urls";

export default function MusicTastePanel({ room, content }) {
  const sections = [
    { title: "On repeat", items: content.artists },
    { title: "The sounds I gravitate toward", items: content.genres },
    { title: "On the dance floor", items: content.danceStyles },
  ].filter((section) => section.items.length);
  const playlistUrl = safeUrl(content.playlistUrl);

  return (
    <>
      {room.lede && <p className="panel-lede">{room.lede}</p>}
      {content.note && <p>{content.note}</p>}
      {sections.map((section) => (
        <section className="music-taste-section" key={section.title}>
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      {playlistUrl && (
        <a className="panel-link" href={playlistUrl} target="_blank" rel="noopener noreferrer">
          {content.playlistLabel} <Icon name="arrow" size={16} />
        </a>
      )}
    </>
  );
}
