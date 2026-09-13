import { ApartmentHeader, ApartmentFooter } from "../apartment/ApartmentLayout";
import React, { useCallback, useState } from "react";
import Apartment from "../apartment/Apartment";
import RoomPanel from "../apartment/RoomPanel";
import { Icon } from "../apartment/Icon";
import useJazzPlayer from "../../hooks/useJazzPlayer";

const ApartmentPage = ({ content }) => {
  const [active, setActive] = useState(null);
  const [night, setNight] = useState(false);
  const player = useJazzPlayer(content.jazzTracks);
  const { sound, audioError, toggleSound } = player;
  const [hovered, setHovered] = useState(null);
  const open = (id) => {
    if (content.rooms.some((room) => room.id === id)) setActive(id);
  };
  const close = useCallback(() => setActive(null), []);
  const { settings, rooms, cities, apartmentProjects, jazzTracks } = content;
  return (
    <main className={`apartment-site${night ? " is-night" : ""}`}>
      <audio ref={player.audio} preload="none" onEnded={player.onEnded} onError={player.onError} />
      <ApartmentHeader settings={settings} />
      <section className="apartment-intro" aria-labelledby="welcome-title">
        <div className="welcome-note">
          <span /> {settings.introEyebrow}
        </div>
        <h1 id="welcome-title">
          {settings.introTitle} <em>{settings.introEmphasis}</em>
        </h1>
        <p>
          {settings.introLines.map((line, index) => (
            <React.Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </p>
      </section>
      <section className="room-section" aria-label="Rex’s interactive apartment">
        <div className="room-topline">
          <span className="room-coordinate">
            {settings.apartmentLabel} <span>·</span> {settings.apartmentNote}
          </span>
          <div className="room-controls">
            <button
              onClick={toggleSound}
              aria-pressed={sound}
              aria-label={sound ? "Pause café jazz" : "Play café jazz"}
            >
              <Icon name={sound ? "sound" : "muted"} size={16} />
              <span>Sound {sound ? "on" : "off"}</span>
            </button>
            <span className="control-divider" />
            <button
              onClick={() => setNight((current) => !current)}
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
            onOpen={open}
            hovered={hovered}
            onHover={setHovered}
            night={night}
            sound={sound}
          />
          <div className="room-caption">
            <span className="tiny-cross">✧</span>{" "}
            {hovered
              ? hovered === "cat"
                ? settings.catCaption
                : `Explore ${hovered === "speaker" ? settings.speakerLabel : rooms.find((room) => room.id === hovered)?.name.toLowerCase() || "the apartment"}`
              : settings.idleCaption}
          </div>
          <span className="room-signature" aria-hidden="true">
            {settings.signature}
          </span>
        </div>
        {audioError && (
          <p className="audio-error" role="status">
            {audioError}
          </p>
        )}
      </section>
      <nav className="explore-nav" aria-label="Explore the apartment">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => open(room.id)}
            onMouseEnter={() => setHovered(room.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(room.id)}
            onBlur={() => setHovered(null)}
          >
            <Icon name={room.icon} size={20} />
            <span>{room.short}</span>
            <span className="nav-arrow">↗</span>
          </button>
        ))}
      </nav>
      <ApartmentFooter settings={settings} />
      {active && (
        <RoomPanel
          active={active}
          onClose={close}
          onNavigate={setActive}
          player={player}
          rooms={rooms}
          cities={cities}
          projects={apartmentProjects}
          tracks={jazzTracks}
          settings={settings}
        />
      )}
    </main>
  );
};
export default ApartmentPage;
