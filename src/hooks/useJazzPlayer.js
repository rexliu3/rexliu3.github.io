import { useEffect, useRef, useState } from "react";

const EMPTY_TRACKS = [];
const DEFAULT_VOLUME = 0.15;

export default function useJazzPlayer(jazzTracks = EMPTY_TRACKS) {
  const audio = useRef(null);
  const request = useRef(0);
  const enabled = useRef(false);
  const [track, setTrack] = useState(jazzTracks[0] || null);
  const [sound, setSound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [audioError, setAudioError] = useState("");

  useEffect(() => {
    const player = audio.current;
    if (!player) return undefined;
    player.volume = DEFAULT_VOLUME;
    return () => {
      enabled.current = false;
      request.current += 1;
      player.pause();
      player.removeAttribute("src");
      player.load();
    };
  }, []);

  useEffect(() => {
    if (!track && jazzTracks.length) setTrack(jazzTracks[0]);
  }, [jazzTracks, track]);

  const playTrack = async (next) => {
    if (!next || !audio.current) return;
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
      if (request.current === currentRequest) {
        setSound(true);
        setLoading(false);
      }
    } catch (error) {
      if (request.current !== currentRequest) return;
      enabled.current = false;
      setSound(false);
      setLoading(false);
      setAudioError("That record couldn’t play. Please try again or choose another track.");
    }
  };

  const toggleSound = () => {
    if (!track || !audio.current) return;
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

  const changeVolume = (value) => {
    if (!Number.isFinite(value)) return;
    const nextVolume = Math.min(1, Math.max(0, value));
    if (audio.current) audio.current.volume = nextVolume;
    setVolume(nextVolume);
  };
  const selectTrack = (next) => {
    if (!next) return;
    if (enabled.current) playTrack(next);
    else {
      setTrack(next);
      setAudioError("");
    }
  };
  const onEnded = () => {
    if (!enabled.current || !track || !jazzTracks.length) return;
    const nextIndex =
      (jazzTracks.findIndex((item) => item.id === track.id) + 1) % jazzTracks.length;
    playTrack(jazzTracks[nextIndex]);
  };
  const onError = () => {
    enabled.current = false;
    request.current += 1;
    setSound(false);
    setLoading(false);
    setAudioError("That record couldn’t load. Please try again or choose another track.");
  };

  return {
    audio,
    track,
    sound,
    loading,
    volume,
    audioError,
    selectTrack,
    toggleSound,
    changeVolume,
    onEnded,
    onError,
  };
}
