import React from "react";
import Apartment from "./Apartment";
import { Icon } from "./Icon";

function getCaption(hovered, rooms, settings, raining) {
  if (!hovered) return settings.idleCaption;
  if (hovered === "cat") return settings.catCaption;
  if (hovered === "window")
    return raining ? "Click the window for clear skies" : "Click the window for rain";
  const label =
    hovered === "speaker"
      ? settings.speakerLabel
      : rooms.find((room) => room.id === hovered)?.name.toLowerCase() || "the apartment";
  return `Explore ${label}`;
}

export default function ApartmentScene({
  settings,
  rooms,
  hovered,
  night,
  raining,
  onToggleWeather,
  sound,
  portrait,
  audioError,
  onOpen,
  onHover,
  onToggleNight,
  onToggleSound,
  directoryOpen,
  directoryToggle,
  onToggleDirectory,
  track,
}) {
  const caption = getCaption(hovered, rooms, settings, raining);
  return (
    <section className="room-section" aria-label="Rex’s interactive apartment">
      <div className="room-topline">
        <span className="room-coordinate">
          {settings.apartmentLabel} <span>·</span>{" "}
          <span className="room-note">{settings.apartmentNote}</span>
        </span>
        <div className="room-controls">
          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={sound}
            aria-label={sound ? "Pause café jazz" : "Play café jazz"}
          >
            <Icon name={sound ? "sound" : "muted"} size={16} />
            <span>Sound {sound ? "on" : "off"}</span>
          </button>
          <span className="control-divider" />
          <button
            type="button"
            onClick={onToggleNight}
            aria-pressed={night}
            aria-label={night ? "Switch to daytime" : "Switch to nighttime"}
          >
            <Icon name={night ? "moon" : "sun"} size={18} />
            <span>{night ? "Night" : "Day"}</span>
          </button>
        </div>
      </div>
      <div className="room-stage">
        <div className="room-aside" aria-hidden="true">
          {settings.asideLines.map((line, index) => (
            <React.Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}{" "}
          <span>⤵</span>
        </div>
        <Apartment
          onOpen={onOpen}
          hovered={hovered}
          onHover={onHover}
          night={night}
          raining={raining}
          onToggleWeather={onToggleWeather}
          sound={sound}
          portrait={portrait}
        />
        <div className="room-caption" role="status">
          <span className="tiny-cross">✧</span> {caption}
        </div>
        <span className="room-signature" aria-hidden="true">
          {settings.signature}
        </span>
      </div>
      <div className="room-bottomline">
        <span className="room-record">
          <span className={`record-indicator${sound ? " is-playing" : ""}`} aria-hidden="true" />
          {sound && track
            ? `On the record · ${track.title}`
            : "A little jazz makes it feel like home."}
        </span>
        <button
          type="button"
          className="directory-toggle"
          id="explore"
          ref={directoryToggle}
          aria-expanded={directoryOpen}
          aria-controls="room-directory"
          onClick={onToggleDirectory}
        >
          <Icon name="grid" size={16} /> Browse all corners{" "}
          <span aria-hidden="true">{directoryOpen ? "−" : "+"}</span>
        </button>
      </div>
      {audioError && (
        <p className="audio-error" role="status">
          {audioError}
        </p>
      )}
    </section>
  );
}
