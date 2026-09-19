import React from "react";
import { Icon } from "../Icon";
import { safeUrl } from "../../../utils/urls";

export default function MusicTastePanel({ room, content, topSongsByYear = [] }) {
  const sections = [
    { title: "On repeat", items: content.artists },
    { title: "The sounds I gravitate toward", items: content.genres },
    { title: "On the dance floor", items: content.danceStyles },
  ].filter((section) => section.items.length);
  const playlistUrl = safeUrl(content.playlistUrl);
  const spotifyUrl = safeUrl(content.spotifyUrl);

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
      {topSongsByYear.length > 0 && (
        <section className="top-songs" aria-label="Top songs by year">
          <h3>Top songs by year</h3>
          {topSongsByYear.map(({ _key, year, songs }) => (
            <div className="top-songs-year" key={_key || year}>
              <h4>{year}</h4>
              <ol>
                {songs.map((song) => (
                  <li key={song._key}>
                    <span>
                      <strong>{song.title}</strong>
                      {song.artist && <small>{song.artist}</small>}
                    </span>
                    {song.spotifyUrl && (
                      <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        Play <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}
      {playlistUrl && (
        <a className="panel-link" href={playlistUrl} target="_blank" rel="noopener noreferrer">
          {content.playlistLabel} <Icon name="arrow" size={16} />
        </a>
      )}
      {spotifyUrl && (
        <a className="panel-link" href={spotifyUrl} target="_blank" rel="noopener noreferrer">
          {content.spotifyLabel} <Icon name="arrow" size={16} />
        </a>
      )}
    </>
  );
}
