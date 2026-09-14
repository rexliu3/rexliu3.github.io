import React, { useCallback, useState } from "react";
import { ApartmentHeader, ApartmentFooter } from "../apartment/ApartmentLayout";
import ApartmentIntro from "../apartment/ApartmentIntro";
import ApartmentScene from "../apartment/ApartmentScene";
import ApartmentNavigation from "../apartment/ApartmentNavigation";
import RoomPanel from "../apartment/RoomPanel";
import useJazzPlayer from "../../hooks/useJazzPlayer";

const ApartmentPage = ({ content }) => {
  const { settings, rooms, cities, apartmentProjects, jazzTracks, instagramPosts } = content;
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [night, setNight] = useState(false);
  const player = useJazzPlayer(jazzTracks);
  const [hovered, setHovered] = useState(null);
  const openRoom = (id) => {
    if (rooms.some((room) => room.id === id)) setActiveRoomId(id);
  };
  const closeRoom = useCallback(() => setActiveRoomId(null), []);
  return (
    <main className={`apartment-site${night ? " is-night" : ""}`}>
      <audio ref={player.audio} preload="none" onEnded={player.onEnded} onError={player.onError} />
      <ApartmentHeader settings={settings} />
      <ApartmentIntro settings={settings} />
      <ApartmentScene
        settings={settings}
        rooms={rooms}
        hovered={hovered}
        night={night}
        sound={player.sound}
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
          rooms={rooms}
          cities={cities}
          projects={apartmentProjects}
          instagramPosts={instagramPosts}
          tracks={jazzTracks}
          settings={settings}
        />
      )}
    </main>
  );
};
export default ApartmentPage;
