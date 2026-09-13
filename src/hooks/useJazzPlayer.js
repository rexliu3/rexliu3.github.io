import { useEffect, useRef, useState } from "react";
import { jazzTracks } from "../components/apartment/jazzTracks";

export default function useJazzPlayer() {
  const audio = useRef(null);
  const request = useRef(0);
  const enabled = useRef(false);
  const [track, setTrack] = useState(jazzTracks[0]);
  const [sound, setSound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [audioError, setAudioError] = useState("");

  useEffect(() => {
    const player = audio.current;
    player.volume = 0.15;
    return () => { request.current += 1; player.pause(); player.removeAttribute("src"); player.load(); };
  }, []);

  const playTrack = async next => {
    const player = audio.current;
    const currentRequest = ++request.current;
    setTrack(next);
    setAudioError("");
    setLoading(true);
    setSound(false);
    if (player.getAttribute("src") !== next.src) {
      player.pause();
      player.setAttribute("src", next.src);
    }
    if (player.error) player.load();
    try {
      await player.play();
      if (request.current === currentRequest) { setSound(true); setLoading(false); }
    } catch (error) {
      if (request.current !== currentRequest) return;
      enabled.current = false;
      setSound(false);
      setLoading(false);
      setAudioError("That record couldn’t play. Please try again or choose another track.");
    }
  };

  const toggleSound = () => {
    if (enabled.current) {
      enabled.current = false;
      request.current += 1;
      audio.current.pause();
      setSound(false);
      setLoading(false);
    } else {
      enabled.current = true;
      playTrack(track);
    }
  };

  const changeVolume = value => { audio.current.volume = value; setVolume(value); };
  const selectTrack = next => {
    if (enabled.current) playTrack(next);
    else { setTrack(next); setAudioError(""); }
  };
  const onEnded = () => {
    if (!enabled.current) return;
    const nextIndex = (jazzTracks.findIndex(item => item.id === track.id) + 1) % jazzTracks.length;
    playTrack(jazzTracks[nextIndex]);
  };
  const onError = () => {
    enabled.current = false;
    request.current += 1;
    setSound(false);
    setLoading(false);
    setAudioError("That record couldn’t load. Please try again or choose another track.");
  };

  return { audio, track, sound, loading, volume, audioError, selectTrack, toggleSound, changeVolume, onEnded, onError };
}
