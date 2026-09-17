import React, { useRef, useState } from "react";
import { ApartmentHeader, ApartmentFooter } from "../components/apartment/ApartmentLayout";
import ApartmentIntro from "../components/apartment/ApartmentIntro";
import ApartmentScene from "../components/apartment/ApartmentScene";
import RoomPanel from "../components/apartment/RoomPanel";
import useJazzPlayer from "../hooks/useJazzPlayer";
import useRoomNavigation from "../hooks/useRoomNavigation";
import useTheme from "../hooks/useTheme";
import RoomDirectory from "../components/apartment/RoomDirectory";
import PortfolioOverview from "../components/apartment/PortfolioOverview";

export default function ApartmentPage({ content }) {
  const { settings, rooms, jazzTracks, apartmentPortrait } = content;
  const { activeRoomId, openRoom, closeRoom } = useRoomNavigation(rooms);
  const { night, toggleNight } = useTheme();
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const directoryToggle = useRef(null);
  const player = useJazzPlayer(jazzTracks);
  const [hovered, setHovered] = useState(null);
  const [raining, setRaining] = useState(false);
  return (
    <main className={`apartment-site${night ? " is-night" : ""}`}>
      <audio ref={player.audio} preload="none" onEnded={player.onEnded} onError={player.onError} />
      <div inert={activeRoomId ? true : undefined}>
        <a className="skip-link" href="#explore">
          Skip to apartment navigation
        </a>
        <ApartmentHeader settings={settings} onOpen={openRoom} />
        <ApartmentIntro settings={settings} onOpen={openRoom} />
        <ApartmentScene
          settings={settings}
          rooms={rooms}
          hovered={hovered}
          night={night}
          raining={raining}
          onToggleWeather={() => setRaining((current) => !current)}
          sound={player.sound}
          portrait={apartmentPortrait}
          audioError={player.audioError}
          onOpen={openRoom}
          onHover={setHovered}
          onToggleNight={toggleNight}
          onToggleSound={player.toggleSound}
          directoryOpen={directoryOpen}
          directoryToggle={directoryToggle}
          onToggleDirectory={() => setDirectoryOpen((current) => !current)}
          track={player.track}
        />
        {directoryOpen && (
          <RoomDirectory
            rooms={rooms}
            onOpen={openRoom}
            onClose={() => {
              setDirectoryOpen(false);
              directoryToggle.current?.focus();
            }}
          />
        )}
        <PortfolioOverview content={content} onOpen={openRoom} />
        <ApartmentFooter settings={settings} />
      </div>
      {activeRoomId && (
        <RoomPanel
          active={activeRoomId}
          onClose={closeRoom}
          onNavigate={openRoom}
          player={player}
          content={content}
        />
      )}
    </main>
  );
}
