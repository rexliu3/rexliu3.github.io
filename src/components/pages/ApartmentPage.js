import React, { useCallback, useState } from "react";
import { ApartmentHeader, ApartmentFooter } from "../apartment/ApartmentLayout";
import ApartmentIntro from "../apartment/ApartmentIntro";
import ApartmentScene from "../apartment/ApartmentScene";
import ApartmentNavigation from "../apartment/ApartmentNavigation";
import RoomPanel from "../apartment/RoomPanel";
import useJazzPlayer from "../../hooks/useJazzPlayer";

export default function ApartmentPage({ content }) {
  const { settings, rooms, jazzTracks, apartmentPortrait } = content;
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [night, setNight] = useState(false);
  const player = useJazzPlayer(jazzTracks);
  const [hovered, setHovered] = useState(null);
  const openRoom = useCallback(
    (id) => {
      if (rooms.some((room) => room.id === id)) setActiveRoomId(id);
    },
    [rooms]
  );
  const closeRoom = useCallback(() => setActiveRoomId(null), []);
  return (
    <main className={`apartment-site${night ? " is-night" : ""}`}>
      <audio ref={player.audio} preload="none" onEnded={player.onEnded} onError={player.onError} />
      <ApartmentHeader settings={settings} />
      <ApartmentIntro settings={settings} onOpen={openRoom} />
      <ApartmentScene
        settings={settings}
        rooms={rooms}
        hovered={hovered}
        night={night}
        sound={player.sound}
        portrait={apartmentPortrait}
        audioError={player.audioError}
        onOpen={openRoom}
        onHover={setHovered}
        onToggleNight={() => setNight((current) => !current)}
        onToggleSound={player.toggleSound}
      />
      <ApartmentNavigation rooms={rooms} onOpen={openRoom} onHover={setHovered} />
      <ApartmentFooter settings={settings} />
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
