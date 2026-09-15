import { useCallback, useEffect, useState } from "react";

function readRoom(rooms) {
  const id = new URLSearchParams(window.location.search).get("room");
  return rooms.some((room) => room.id === id) ? id : null;
}

/** Room links survive refreshes and participate in browser back/forward navigation. */
export default function useRoomNavigation(rooms) {
  const [activeRoomId, setActiveRoomId] = useState(() => readRoom(rooms));

  useEffect(() => {
    const sync = () => setActiveRoomId(readRoom(rooms));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [rooms]);

  const openRoom = useCallback(
    (id) => {
      if (!rooms.some((room) => room.id === id)) return;
      const url = new URL(window.location.href);
      // Switching corners within a dialog should not fill the browser history.
      const method = readRoom(rooms) ? "replaceState" : "pushState";
      url.searchParams.set("room", id);
      window.history[method](null, "", url);
      setActiveRoomId(id);
    },
    [rooms]
  );

  const closeRoom = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("room");
    window.history.replaceState(null, "", url);
    setActiveRoomId(null);
  }, []);

  return { activeRoomId, openRoom, closeRoom };
}
