import React, { useEffect, useRef, useState } from "react";
import { Icon, rooms } from "./roomData";
import JazzPlayer from "./JazzPlayer";

const projects = [
  { name: "Minesweeper", image: "/assets/Minesweeper-Wall.png", type: "A classic, rebuilt", text: "A little logic, a little luck, and one more game." },
  { name: "Sorting visualizer", image: "/assets/Sorting-Wall.png", type: "Making algorithms visible", text: "A visual exploration of how order emerges from a jumble of numbers." },
  { name: "Sudoku", image: "/assets/Sudoku-Wall.gif", type: "For the puzzle people", text: "A playground for numbers, patterns, and satisfying solutions." },
];

export default function RoomPanel({ active, onClose, onNavigate, player }) {
  const panel = useRef(null);
  const closeButton = useRef(null);
  const [city, setCity] = useState(0);
  const room = rooms.find(item => item.id === active);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current.focus();
    const onKey = event => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = panel.current.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), a[href], input:not([disabled]), [tabindex="0"]');
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [onClose]);
  const cities = [
    { name: "Vancouver", label: "01 / THE FIRST CHAPTER", subtitle: "Mountains. Ocean. Beginnings.", text: "The first pin on the map. Vancouver marks the beginning of a journey that would lead down the West Coast and across the continent." },
    { name: "San Francisco", label: "02 / THE BAY AREA CHAPTER", subtitle: "A little fog. A lot of possibility.", text: "The Bay Area chapter, with Berkeley just across the water. A place for learning, building, and finding new directions." },
    { name: "New York", label: "03 / THE CURRENT CHAPTER", subtitle: "A city that keeps you curious.", text: "The latest pin, and the place I call home. I’m a software engineer at Palantir Technologies, making things in a city that never runs out of things to discover." },
  ];
  return <div className="panel-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={`room-panel panel-${active}`} role="dialog" aria-modal="true" aria-labelledby="panel-title" ref={panel}>
      <div className="panel-top"><span><Icon name={room.icon} size={17}/> {room.name}</span><button className="close-panel" onClick={onClose} ref={closeButton} aria-label="Back to the apartment"><Icon name="close"/></button></div>
      <div className="panel-content">
        <p className="eyebrow">A LITTLE PIECE OF MY WORLD</p>
        <h2 id="panel-title">{active === "books" ? "Between the covers." : active === "travel" ? "Places that stay with you." : active === "projects" ? "Made just because." : active === "music" ? "A little café jazz." : active === "photos" ? "The little moments." : "A chapter in blue & gold."}</h2>
        {active === "books" && <><p className="panel-lede">A home for the books I like, the ideas that linger, and the pages worth coming back to.</p><div className="book-vignette" aria-hidden="true"><div className="decorative-book">STORIES</div><div className="decorative-book">IDEAS</div><div className="decorative-book">CURIOSITY</div><div className="decorative-book">OTHER WORLDS</div></div><div className="quiet-note"><span className="small-star">✳</span><h3>The shelf is still being unpacked.</h3><p>My reading list and personal notes will live here. Check back for the first stack.</p></div></>}
        {active === "travel" && <><p className="panel-lede">Three cities. Different chapters. One ongoing adventure.</p><div className="city-tabs" role="tablist" aria-label="Cities on my journey">{cities.map((item, index) => <button key={item.name} id={`city-tab-${index}`} role="tab" aria-selected={city === index} aria-controls="city-story" tabIndex={city === index ? 0 : -1} onClick={() => setCity(index)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (city + (event.key === "ArrowRight" ? 1 : 2)) % 3; setCity(next); document.getElementById(`city-tab-${next}`).focus(); } }}>{item.name}{index < 2 && <span aria-hidden="true">→</span>}</button>)}</div><div className="city-story" id="city-story" role="tabpanel" aria-labelledby={`city-tab-${city}`}><CityDrawing city={city}/><p className="eyebrow">{cities[city].label}</p><h3>{cities[city].subtitle}</h3><p>{cities[city].text}</p></div><p className="content-footnote">Travel logs and favorite places are still being unpacked.</p></>}
        {active === "projects" && <><p className="panel-lede">Small experiments and familiar games. Sometimes curiosity is the whole brief.</p><div className="apartment-projects">{projects.map(project => <article key={project.name}><img src={project.image} alt={`${project.name} project preview`}/><div><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p>{project.text}</p></div></article>)}</div><a className="panel-link" href="https://github.com/rexliu3" target="_blank" rel="noopener noreferrer">More things on GitHub <span>↗</span></a></>}
        {active === "music" && <JazzPlayer player={player}/>}
        {active === "photos" && <><p className="panel-lede">People, places, and ordinary days worth remembering.</p><figure className="photo-print"><img src="/assets/Profile-Picture.png" alt="Rex Liu"/><figcaption>Hello from the other side of the camera. <span>— Rex</span></figcaption></figure><div className="quiet-note"><h3>A photo album in the making.</h3><p>More snapshots and stories will find their way here.</p></div></>}
        {active === "berkeley" && <><p className="panel-lede">Three years of questions, late nights, and learning how to build things that matter.</p><div className="berkeley-card"><span className="berkeley-seal">B</span><p>UNIVERSITY OF CALIFORNIA</p><h3>Berkeley</h3><div>B.A. Computer Science <span>·</span> 2020–2023</div></div><div className="berkeley-story"><h3>Curiosity found a home.</h3><p>My Berkeley journey laid the foundation for my work in software engineering—from frontend and backend development to mobile apps, data, and leading engineering teams.</p><p>Today, I’m building at Palantir Technologies in New York. The habit of asking questions came with me.</p></div><a className="panel-link" href="/Resume_RexLiu.pdf" target="_blank" rel="noopener noreferrer">Take a look at my résumé <span>↗</span></a></>}
      </div>
      <div className="panel-bottom"><button onClick={onClose}>← Back to the apartment</button><button aria-label="Explore the next object" onClick={() => { onNavigate(rooms[(rooms.findIndex(item => item.id === active) + 1) % rooms.length].id); panel.current.scrollTop = 0; closeButton.current.focus(); }}>Next little corner <Icon name="arrow" size={16}/></button></div>
    </section>
  </div>;
}

function CityDrawing({ city }) {
  return <svg className="city-drawing" viewBox="0 0 560 180" role="img" aria-label={["Illustration of mountains in Vancouver", "Illustration of the Golden Gate Bridge", "Illustration of the New York skyline"][city]}><rect width="560" height="180" fill={["#dce5dc", "#eadbc6", "#dde1d6"][city]}/><circle cx="429" cy="45" r="23" fill="#f6edcb"/>{city === 0 ? <><path d="m0 141 107-103 99 103 92-127 135 127 60-67 67 69" fill="#91a496"/><path d="m70 74 37-36 41 42-25-8-16 6-13-12Zm195-13 33-47 49 47-27-10-17 16-20-15Z" fill="#f3f0dd"/><path d="M0 142q90-15 186 3t187-2 187 2v35H0Z" fill="#a8c1bc"/><path d="M35 159h150m112 9h140" stroke="#e3e9d8" strokeWidth="2"/></> : city === 1 ? <><path d="M0 153h560v27H0" fill="#b3c7c0"/><g fill="none" stroke="#b46f50"><path d="M148 158V37h18v121m228 0V37h18v121" strokeWidth="7"/><path d="M0 125h560" strokeWidth="7"/><path d="M0 111q85-13 156-67 127 133 247 0 79 58 157 68" strokeWidth="3"/>{[40, 80, 120, 195, 230, 265, 300, 335, 370, 440, 480, 520].map(x => <path key={x} d={`M${x} 125V${x > 166 && x < 393 ? 60 + Math.sin((x - 156) / 247 * Math.PI) * 51 : 98}`}/>)}</g></> : <><path d="M0 150h39V97h39v53h18V74h30v76h18V93h28v57h25V52h15V27h4V9h3v18h4v25h16v98h20V84h40v66h15V45h43v105h18V71h32v79h15V93h47v57h21V63h39v87h40v30H0Z" fill="#859b8d"/><path d="M0 161h560" stroke="#c0ccb6" strokeWidth="3"/><g fill="#d8debb">{[48, 106, 205, 225, 269, 327, 343, 384, 438, 496].map(x => <path key={x} d={`M${x} 103h5v8h-5Zm0 19h5v8h-5Z`}/>)}</g></>}</svg>;
}
