import React, { useCallback, useEffect, useRef, useState } from "react";
import Apartment from "../apartment/Apartment";
import RoomPanel from "../apartment/RoomPanel";
import { Icon, rooms } from "../apartment/roomData";

const MainPage = () => {
  const [active, setActive] = useState(null);
  const [night, setNight] = useState(false);
  const [sound, setSound] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [hovered, setHovered] = useState(null);
  const audio = useRef(null);
  const trigger = useRef(null);
  useEffect(() => () => { if (audio.current) audio.current.close(); }, []);
  const open = (id) => { trigger.current = document.activeElement; setActive(id); };
  const close = useCallback(() => { setActive(null); if (trigger.current) trigger.current.focus(); }, []);
  const toggleSound = async () => {
    try {
      if (sound && audio.current) { await audio.current.suspend(); setSound(false); return; }
      if (!audio.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        audio.current = context;
        const volume = context.createGain();
        volume.gain.value = 0.045;
        volume.connect(context.destination);
        [130.81, 164.81, 196, 261.63].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const pulse = context.createOscillator();
          const depth = context.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          gain.gain.value = 0.2;
          pulse.frequency.value = 0.08 + index * 0.025;
          depth.gain.value = 0.12;
          pulse.connect(depth); depth.connect(gain.gain);
          oscillator.connect(gain); gain.connect(volume);
          oscillator.start(); pulse.start();
        });
      }
      await audio.current.resume(); setSound(true); setAudioError("");
    } catch (error) { setAudioError("Room audio isn’t available in this browser."); setSound(false); }
  };
  return (
    <main className={`apartment-site${night ? " is-night" : ""}`}>
      <header className="apartment-header">
        <a className="brand" href="/" aria-label="Rex’s apartment home"><span className="brand-icon"><Icon name="home" size={20}/></span> rex’s apartment<span className="brand-period">.</span></a>
        <div className="header-right"><span className="location"><span className="status-dot"/> Somewhere in New York</span><a className="say-hello" href="mailto:rexliu3@berkeley.edu">Say hello <span>↗</span></a></div>
      </header>
      <section className="apartment-intro" aria-labelledby="welcome-title">
        <div className="welcome-note"><span/> THE DOOR’S ALWAYS OPEN</div>
        <h1 id="welcome-title">Make yourself <em>at home.</em><span className="title-spark" aria-hidden="true">✳</span></h1>
        <p>I’m Rex. Builder, wanderer, and collector of little joys.<br/>Welcome to my little corner of the internet.</p>
      </section>
      <section className="room-section" aria-label="Rex’s interactive apartment">
        <div className="room-topline"><span className="room-coordinate">APT. 001 <span>·</span> A WORK IN PROGRESS, LIKE ME</span><div className="room-controls"><button onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Mute room ambience" : "Play room ambience"}><Icon name={sound ? "sound" : "muted"} size={16}/><span>Sound {sound ? "on" : "off"}</span></button><span className="control-divider"/><button onClick={() => setNight(!night)} aria-pressed={night} aria-label={night ? "Switch to daytime" : "Switch to nighttime"}><Icon name={night ? "moon" : "sun"} size={18}/><span>{night ? "Night" : "Day"}</span></button></div></div>
        <div className="room-stage">
          <div className="room-aside" aria-hidden="true">a few of my<br/>favorite things <span>⤵</span></div>
          <Apartment onOpen={open} hovered={hovered} onHover={setHovered} night={night} sound={sound}/>
          <div className="room-caption"><span className="tiny-cross">✧</span> {hovered ? `Explore ${rooms.find(room => room.id === hovered).name.toLowerCase()}` : "Every object has a story. Click around."}</div>
          <span className="room-signature" aria-hidden="true">stay a little while ♡</span>
        </div>
        {audioError && <p className="audio-error" role="status">{audioError}</p>}
      </section>
      <nav className="explore-nav" aria-label="Explore the apartment">
        {rooms.map(room => <button key={room.id} onClick={() => open(room.id)} onMouseEnter={() => setHovered(room.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(room.id)} onBlur={() => setHovered(null)}><Icon name={room.icon} size={20}/><span>{room.short}</span><span className="nav-arrow">↗</span></button>)}
      </nav>
      <footer className="apartment-footer"><p>Built with curiosity. Lived in with love.</p><div><a href="https://github.com/rexliu3" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/rexliu3" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><span>© {new Date().getFullYear()} Rex Liu</span></div></footer>
      {active && <RoomPanel active={active} onClose={close} onNavigate={setActive} sound={sound} toggleSound={toggleSound} audioError={audioError}/>}
    </main>
  );
};
export default MainPage;
