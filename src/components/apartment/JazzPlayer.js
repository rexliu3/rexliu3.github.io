import React from "react";
import { jazzTracks } from "./jazzTracks";

export default function JazzPlayer({ player }) {
  const { track, sound, loading, volume, audioError, selectTrack, toggleSound, changeVolume } = player;
  return <>
    <p className="panel-lede">Pick a record, pour something warm, and stay a little while.</p>
    <div className={`record-player${sound ? " is-playing" : ""}`} aria-hidden="true">
      <div className="vinyl-record"><span style={{ background: track.color }}>CAFÉ<br/>REX</span></div><div className="record-arm"/>
    </div>
    <div className="now-playing">
      <div aria-live="polite"><p className="eyebrow">{loading ? "PUTTING THE RECORD ON…" : sound ? "NOW PLAYING" : "ON THE TURNTABLE"}</p><h3>{track.title}</h3><p>{track.mood}</p></div>
      <button className="round-play" onClick={toggleSound} aria-label={loading ? "Cancel playback" : `${sound ? "Pause" : "Play"} ${track.title}`}>{sound || loading ? "Ⅱ" : "▶"}</button>
    </div>
    <div className="jazz-volume"><label htmlFor="jazz-volume">Volume</label><input id="jazz-volume" type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={event => changeVolume(Number(event.target.value) / 100)}/><span>{Math.round(volume * 100)}%</span></div>
    <p className="eyebrow" id="jazz-choices">FIVE RECORDS FOR A SLOW AFTERNOON</p>
    <ol className="jazz-tracks" aria-labelledby="jazz-choices">
      {jazzTracks.map((item, index) => <li key={item.id}>
        <button aria-pressed={track.id === item.id} aria-label={`Select ${item.title}`} onClick={() => selectTrack(item)}>
          <span className="jazz-track-number" style={{ "--record-color": item.color }} aria-hidden="true">{track.id === item.id && sound ? "♪" : `0${index + 1}`}</span>
          <span className="jazz-track-copy"><strong>{item.title}</strong><span>{item.mood}</span></span>
          <span className="jazz-track-duration">{item.duration}</span>
        </button>
      </li>)}
    </ol>
    {audioError && <p role="status">{audioError}</p>}
    <p className="jazz-credits">All five recordings by <a href="https://incompetech.com/music/royalty-free/" target="_blank" rel="noopener noreferrer">Kevin MacLeod (incompetech.com)</a>, licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>.</p>
  </>;
}
