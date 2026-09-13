import React from "react";
export default function JazzPlayer({ player, tracks, content }) {
  const { track, sound, loading, volume, audioError, selectTrack, toggleSound, changeVolume } =
    player;
  if (!track) return null;
  return (
    <>
      <p className="panel-lede">{content.lede}</p>
      <div className={`record-player${sound ? " is-playing" : ""}`} aria-hidden="true">
        <div className="vinyl-record">
          <span style={{ background: track.color }}>
            CAFÉ
            <br />
            REX
          </span>
        </div>
        <div className="record-arm" />
      </div>
      <div className="now-playing">
        <div aria-live="polite">
          <p className="eyebrow">
            {loading ? "PUTTING THE RECORD ON…" : sound ? "NOW PLAYING" : "ON THE TURNTABLE"}
          </p>
          <h3>{track.title}</h3>
          <p>{track.mood}</p>
        </div>
        <button
          className="round-play"
          onClick={toggleSound}
          aria-label={loading ? "Cancel playback" : `${sound ? "Pause" : "Play"} ${track.title}`}
        >
          {sound || loading ? "Ⅱ" : "▶"}
        </button>
      </div>
      <div className="jazz-volume">
        <label htmlFor="jazz-volume">Volume</label>
        <input
          id="jazz-volume"
          type="range"
          min="0"
          max="100"
          value={Math.round(volume * 100)}
          onChange={(event) => changeVolume(Number(event.target.value) / 100)}
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>
      <p className="eyebrow" id="jazz-choices">
        {content.choicesLabel}
      </p>
      <ol className="jazz-tracks" aria-labelledby="jazz-choices">
        {tracks.map((item, index) => (
          <li key={item.id}>
            <button
              aria-pressed={track.id === item.id}
              aria-label={`Select ${item.title}`}
              onClick={() => selectTrack(item)}
            >
              <span
                className="jazz-track-number"
                style={{ "--record-color": item.color }}
                aria-hidden="true"
              >
                {track.id === item.id && sound ? "♪" : `0${index + 1}`}
              </span>
              <span className="jazz-track-copy">
                <strong>{item.title}</strong>
                <span>{item.mood}</span>
              </span>
              <span className="jazz-track-duration">{item.duration}</span>
            </button>
          </li>
        ))}
      </ol>
      {audioError && <p role="status">{audioError}</p>}
      <p className="jazz-credits">
        {content.creditsPrefix}{" "}
        <a href={content.artistUrl} target="_blank" rel="noopener noreferrer">
          {content.artistLabel}
        </a>
        , {content.licensePrefix}{" "}
        <a href={content.licenseUrl} target="_blank" rel="noopener noreferrer">
          {content.licenseLabel}
        </a>
        .
      </p>
    </>
  );
}
