import React from "react";

// One world unit is approximately a centimetre. Every wall, floor plane and
// piece of furniture uses this same oblique projection and vertical scale.
const project = (x, y, z = 0) => [130 + x + y * 0.5, 400 - x * 0.1 + y * 0.5 - z];
const points = vertices => vertices.map(vertex => project(...vertex).join(",")).join(" ");
const front = (x, y, z) => `matrix(1 -.1 0 1 ${project(x, y, z).join(" ")})`;
const floor = (x, y, z = 0) => `matrix(1 -.1 .5 .5 ${project(x, y, z).join(" ")})`;

function Face({ vertices, ...props }) {
  return <polygon points={points(vertices)} {...props}/>;
}
function Edge({ from, to, ...props }) {
  const [x1, y1] = project(...from), [x2, y2] = project(...to);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...props}/>;
}
function Box({ x, y, z = 0, w, d, h, top = "#dbb88a", side = "#af875c", face = "#c39b6c", stroke = "#907353" }) {
  return <g stroke={stroke} strokeWidth="1.3" strokeLinejoin="round">
    <Face vertices={[[x,y,z],[x,y+d,z],[x,y+d,z+h],[x,y,z+h]]} fill={side}/>
    <Face vertices={[[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]]} fill={face}/>
    <Face vertices={[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]]} fill={top}/>
  </g>;
}
function Shadow({ x, y, w, d }) {
  return <rect transform={floor(x, y, 0.5)} width={w} height={d} rx="12" fill="#685642" opacity=".1"/>;
}
function Plant({ x, y, z = 0, scale = 1 }) {
  const [sx, sy] = project(x, y, z);
  return <g transform={`translate(${sx} ${sy}) scale(${scale})`}>
    <ellipse cy="2" rx="25" ry="7" fill="#72573f" opacity=".12"/>
    <path d="M-19-32h38L14 0Q0 8-14 0Z" fill="#bd805a" stroke="#92704e" strokeWidth="1.5"/>
    <ellipse cy="-32" rx="19" ry="6" fill="#8d694b"/>
    <g className="plant-leaves"><path d="M0-32v-70m0 37-25-25m25 11 24-28M0-84l-15-23" stroke="#718153" strokeWidth="2.5" fill="none"/>
      <path d="M0-54Q-37-54-34-83Q-6-88 0-54" fill="#879b6c"/><path d="M1-70Q4-104 31-102Q35-74 1-70" fill="#6e875a"/>
      <path d="M0-88Q-28-79-25-113Q-1-116 0-88" fill="#94a67a"/><path d="M1-91Q-3-117 16-128Q34-105 1-91" fill="#71895b"/>
      <path d="M-4-58-25-77M6-78l19-19" stroke="#b3bf90" fill="none"/>
    </g><path d="m-12-25 3 23" stroke="#d7a17a" strokeWidth="2.5"/>
  </g>;
}
function Hotspot({ id, label, children, onOpen, hovered, onHover }) {
  return <g role="button" tabIndex="0" aria-label={`Explore ${label}`} className={`room-object ${hovered === id ? "is-highlighted" : ""}`} onClick={() => onOpen(id)} onMouseEnter={() => onHover(id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(id)} onBlur={() => onHover(null)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(id); } }}>{children}</g>;
}
function ObjectTag({ x, y, z, label }) {
  return <g className="object-tag" transform={`translate(${project(x,y,z).join(" ")})`}><rect x={-(label.length * 3.6 + 17)} y="-15" width={label.length * 7.2 + 34} height="30" rx="15"/><text textAnchor="middle" y="4">{label} ↗</text></g>;
}

function RoomShell({ night }) {
  return <>
    <g filter="url(#room-shadow)" stroke="#a78e6d" strokeWidth="1.4" strokeLinejoin="round">
      <Face vertices={[[0,0,0],[720,0,0],[720,420,0],[0,420,0]]} fill="url(#floor)"/>
      <Face vertices={[[0,0,0],[720,0,0],[720,0,280],[0,0,280]]} fill="url(#wall)"/>
      <Face vertices={[[720,0,0],[720,420,0],[720,420,280],[720,0,280]]} fill="#dfd1b9"/>
      <Face vertices={[[0,0,0],[0,420,0],[0,420,-12],[0,0,-12]]} fill="#c5a47e"/>
      <Face vertices={[[0,420,0],[720,420,0],[720,420,-12],[0,420,-12]]} fill="#d0b18a"/>
      <Face vertices={[[0,1,0],[720,1,0],[720,1,10],[0,1,10]]} fill="#f2e6cf"/>
      <Face vertices={[[719,0,0],[719,420,0],[719,420,10],[719,0,10]]} fill="#ecdec3"/>
      <g stroke="#bd9b70" strokeWidth=".8" opacity=".5">
        {Array.from({length: 13}, (_, i) => <Edge key={i} from={[0,(i+1)*30,.3]} to={[720,(i+1)*30,.3]}/>)}
        {Array.from({length: 14}, (_, row) => [0,1,2].map(column => <Edge key={`${row}-${column}`} from={[80+column*230+(row%2)*90,row*30,.3]} to={[80+column*230+(row%2)*90,(row+1)*30,.3]}/>))}
      </g>
    </g>
    {!night && <Face className="sunbeam" vertices={[[449,5,1],[630,5,1],[468,265,1],[287,265,1]]} fill="#fff0bc" opacity=".22"/>}
    <g transform={floor(145,205,1)} strokeLinejoin="round">
      <rect width="325" height="195" rx="3" fill="url(#rug)" stroke="#bc8c71" strokeWidth="2"/>
      <rect x="9" y="9" width="307" height="177" rx="1" fill="none" stroke="#f1d5b8" strokeWidth="4"/>
      <rect x="17" y="17" width="291" height="161" fill="none" stroke="#bd9277" strokeWidth="1.2"/>
      {Array.from({length: 32}, (_, i) => <path key={i} d={`M${7+i*10} 195v8M${7+i*10} 0v-8`} stroke="#c19879" strokeWidth="1.2"/>)}
    </g>
  </>;
}

function Window({ night }) {
  return <g transform={front(443,1,246)} stroke="#a08864" strokeWidth="1.5">
    <rect x="-5" y="-5" width="200" height="147" rx="3" fill="#c6b18c"/>
    <rect width="190" height="137" fill="url(#sky)"/>
    <g clipPath="url(#window-clip)" stroke="none">
      {night ? <g fill="#f6e5b9"><circle cx="148" cy="29" r="12"/><circle cx="36" cy="21" r="1.5"/><circle cx="79" cy="37" r="1"/><circle cx="170" cy="62" r="1.4"/></g> : <g className="window-clouds" fill="#f7f4e3" opacity=".85"><path d="M13 37q9-14 19-7 9-17 21-3 15-2 20 10Z"/><path d="M119 20q8-9 14-4 9-12 20-1 10-1 16 9h-50Z"/></g>}
      <path d="M0 137V87h17V69h18v38h13V82h18v-8h17v33h14V65h8V51h4V35h3v16h4v14h8v39h12V79h16v-9h21v35h17v32Z" fill={night ? "#374b54" : "#a0b5a7"}/>
      <path d="M0 137v-29h25V93h25v27h19V97h26v-8h20v27h14V94h32v15h29v28Z" fill={night ? "#2a3e46" : "#819b8d"}/>
      {[29,43,76,87,101,137,149,174].map(x => <path key={x} d={`M${x} 106h3v5h-3Zm0 12h3v5h-3Z`} fill={night ? "#e8cc85" : "#d3d9bc"}/>)}
    </g>
    <rect x="3" y="3" width="184" height="131" fill="none" stroke="#eee4ca" strokeWidth="5"/>
    <path d="M95 0v137M0 69h190" stroke="#eee4ca" strokeWidth="5"/>
    <rect x="-9" y="137" width="208" height="6" rx="1" fill="#f0e3ca"/>
  </g>;
}

function Bookshelf({ common }) {
  const bookColors = ["#83967b", "#d5b97d", "#b77556", "#cfc5a3", "#7d9490", "#ae895a"];
  return <>
    <Shadow x={36} y={18} w={134} d={43}/>
    <Hotspot id="books" label="books I like" {...common}>
      <g><Box x={40} y={12} w={125} d={34} h={192}/>
        <g transform={front(46,47,185)}>
          <rect width="113" height="177" fill="#97724f"/>
          {[0,1,2].map(row => <g key={row} transform={`translate(0 ${row*58})`}>
            {bookColors.map((color,index) => <g key={color} transform={`translate(${5+index*17} ${10+(index%3)*4})`}>
              <rect width={index===2?14:12} height={43-(index%3)*4} rx=".6" fill={color} stroke="#7f6449" strokeWidth=".8"/>
              <path d="M4 6v23M3 35h6" stroke="#f3e5c7" strokeWidth="1" opacity=".65"/>
            </g>)}
            <rect x="-6" y="53" width="125" height="5" fill="#d6ad7d" stroke="#9b7853" strokeWidth="1"/>
          </g>)}
        </g>
      </g><ObjectTag x={102} y={48} z={216} label="Books"/>
    </Hotspot>
    <Plant x={76} y={29} z={192} scale={.42}/>
  </>;
}

function Desk({ common, night }) {
  return <>
    <Shadow x={429} y={14} w={216} d={86}/>
    {[[439,22],[439,83],[629,22],[629,83]].map(([x,y]) => <Box key={`${x}-${y}`} x={x} y={y} w={5} d={5} h={72} top="#b99164" face="#b99164" side="#a27b52"/>)}
    <Box x={585} y={24} z={49} w={49} d={64} h={23}/>
    <g transform={front(590,89,66)} stroke="#a27d53" fill="none"><path d="M0 0h39m-25 6h11m-25 7h39m-25 6h11" strokeWidth="1.3"/></g>
    <Box x={435} y={18} z={72} w={205} d={75} h={5}/>

    <g className="desk-lamp" transform={`translate(${project(612,34,78).join(" ")})`}>
      {night && <ellipse cx="-15" cy="-20" rx="62" ry="50" fill="url(#lamp-glow)"/>}
      <ellipse rx="14" ry="5" fill="#b9a276" stroke="#97805a" strokeWidth="1.2"/>
      <path d="M0-2v-38l-17-16" fill="none" stroke="#8c805e" strokeWidth="3.5"/>
      <circle cy="-38" r="3" fill="#c6b184" stroke="#97805a"/>
      <path d="m-25-62 17 5 4 18-33-9Z" fill="#d6b36e" stroke="#a28753" strokeWidth="1.2"/>
      <path d="m-37-48 33 9" stroke="#f9e4a4" strokeWidth="2.5"/>
    </g>
    <Hotspot id="projects" label="things built for fun" {...common}>
      <g>
        <Box x={494} y={41} z={77} w={55} d={34} h={2} top="#bec5b5" side="#8e9c8c" face="#9ca995" stroke="#697b6b"/>
        <g transform={front(494,41,116)}>
          <path d="M2 0h51l2 38H0Z" fill="#8c9b8d" stroke="#687969" strokeWidth="1.3"/>
          <path d="M6 4h43l2 29H4Z" fill="#344e45"/>
          <g stroke="#96b38c" strokeWidth="1.5" strokeLinecap="round"><path d="M11 10h11m-9 5h22m-19 5h12m-15 5h22"/><path className="screen-cursor" d="M36 25h5" stroke="#e0bd76"/></g>
        </g>
        <g transform={floor(499,48,79.5)}><rect width="45" height="17" rx="1" fill="#849684"/>{[4,9,14].map(y => <path key={y} d={`M3 ${y}h39`} stroke="#b5c0a8" strokeWidth="1"/>)}<rect x="16" y="20" width="15" height="7" rx="1" fill="#a6b39e"/></g>
        <rect transform={front(490,55,119)} width="64" height="59" fill="transparent"/>
      </g><ObjectTag x={521} y={47} z={143} label="Side projects"/>
    </Hotspot>
    <g transform={`translate(${project(465,57,78).join(" ")})`}><ellipse cy="1" rx="11" ry="4" fill="#a68d6c" opacity=".25"/><path d="M-7-13H7v12q-7 6-14 0Z" fill="#f4ebd6" stroke="#a08d6b" strokeWidth="1"/><ellipse cy="-13" rx="7" ry="2.5" fill="#806346"/><path d="M7-10q10-1 8 5-1 5-8 3" fill="none" stroke="#a08d6b" strokeWidth="1.4"/><g className="coffee-steam" fill="none" stroke="#faf6e9" strokeWidth="1.7"><path d="M-2-19q-4-6 0-12t0-9M4-19q4-5 0-10"/></g></g>
    <Hotspot id="photos" label="photos" {...common}>
      <g transform={front(570,75,97)} stroke="#535f4e" strokeWidth="1.1">
        <rect x="-9" y="-10" width="48" height="45" fill="transparent" stroke="none"/>
        <path d="M0 3h7l3-4h9l3 4h8v18H0Z" fill="#66725d"/>
        <path d="M0 7h30v5H0Z" fill="#a5ac98"/>
        <circle cx="16" cy="12" r="9" fill="#42584d"/><circle cx="16" cy="12" r="6" fill="#7d9a8a"/><circle cx="16" cy="12" r="3.5" fill="#334e46"/><circle cx="18" cy="10" r="1.7" fill="#d1dfc2" stroke="none"/>
        <path d="M30 7q15 18-3 21L10 25" fill="none" stroke="#8b7454" strokeWidth="1.5"/>
      </g><ObjectTag x={586} y={80} z={124} label="Photos"/>
    </Hotspot>
    {/* A usable chair faces the desk, with space behind it to walk through. */}
    <g>{[[504,116],[504,159],[550,116],[550,159]].map(([x,y]) => <Box key={`${x}-${y}`} x={x} y={y} w={4} d={4} h={44} face="#ac895e" side="#95744e"/>)}
      <Box x={500} y={112} z={43} w={58} d={55} h={7} top="#9eaa8c" side="#77876b" face="#879777" stroke="#768366"/>
      <Box x={500} y={159} z={49} w={58} d={8} h={35} top="#a9b596" side="#819072" face="#95a484" stroke="#768366"/>
    </g>
  </>;
}

function Sofa() {
  const green = {top: "#a7b38f", side: "#7b8d69", face: "#92a17d", stroke: "#728260"};
  return <g>
    <Shadow x={153} y={188} w={268} d={112}/>
    {[[164,200],[164,280],[402,200],[402,280]].map(([x,y]) => <Box key={`${x}-${y}`} x={x} y={y} w={6} d={6} h={16} face="#a28258" side="#8e704b"/>)}
    <Box x={155} y={190} z={14} w={260} d={100} h={25} {...green}/>
    <Box x={155} y={190} z={39} w={260} d={18} h={49} {...green}/>
    {[175,287].map(x => <Box key={x} x={x} y={210} z={39} w={108} d={76} h={12} {...green} top="#b1bc9a"/>)}
    <Box x={155} y={208} z={39} w={18} d={82} h={31} {...green}/>
    <Box x={397} y={208} z={39} w={18} d={82} h={31} {...green}/>
    <g transform={front(185,220,78)}><path d="m0 0 36-2 8 36-39 2Z" fill="#eee2bd" stroke="#b8ad86" strokeWidth="1.2"/><path d="m8 5 22-1 5 25-23 2Z" fill="none" stroke="#dfd2ad"/></g>
    <g transform={front(235,224,75)}><path d="m0 1 33-3 8 34-36 4Z" fill="#bd805e" stroke="#a57050" strokeWidth="1.2"/><path d="m7 7 22 18m-7-23 9 25" stroke="#d8a27b" strokeWidth="1.2"/></g>
    <Face vertices={[[332,231,52],[367,231,52],[367,290,52],[332,290,52]]} fill="#d9c9a6" stroke="#b4a47f" strokeWidth="1"/>
    <Face vertices={[[332,291,52],[367,291,52],[367,291,17],[332,291,17]]} fill="#d5c29f" stroke="#b4a47f" strokeWidth="1"/>
    {[338,349,360].map(x => <g key={x} stroke="#f1e5cb" strokeWidth="2"><Edge from={[x,231,52.5]} to={[x,291,52.5]}/><Edge from={[x,291,52.5]} to={[x,291,18]}/></g>)}
  </g>;
}

function CoffeeTable() {
  return <g>
    <Shadow x={240} y={321} w={133} d={66}/>
    {[[252,334],[351,334],[252,375],[351,375]].map(([x,y]) => <Box key={`${x}-${y}`} x={x} y={y} w={5} d={5} h={38} face="#b78d5f" side="#98764e"/>)}
    <rect transform={floor(235,320,37)} width="135" height="65" rx="24" fill="#b98d5f" stroke="#97764f" strokeWidth="1.5"/>
    <rect transform={floor(235,320,42)} width="135" height="65" rx="24" fill="#dfbd8e" stroke="#a9885c" strokeWidth="1.5"/>
    <g transform={floor(275,336,43)}><rect width="45" height="29" fill="#f8efd9" stroke="#b7a383" strokeWidth="1"/><path d="M22 0v29M4 7h13M4 12h13M28 7h12M28 12h12M28 17h9" stroke="#c4b594" strokeWidth="1"/></g>
  </g>;
}

function Speaker({ common, sound }) {
  return <>
    <Shadow x={448} y={211} w={76} d={69}/>
    {[[454,218],[454,267],[508,218],[508,267]].map(([x,y]) => <Box key={`${x}-${y}`} x={x} y={y} w={4} d={4} h={14}/>)}
    <Box x={450} y={210} z={12} w={70} d={65} h={38}/>
    <g transform={front(457,276,42)}><rect width="56" height="21" fill="none" stroke="#a58257" strokeWidth="1"/><path d="M23 9h11" stroke="#8e734e" strokeWidth="2"/></g>
    <Hotspot id="music" label="music and dance" {...common}>
      <g><Box x={466} y={224} z={50} w={35} d={25} h={44} top="#c2ab7f" face="#686d57" side="#9d855e" stroke="#807253"/>
        <g transform={front(469,250,90)}><rect width="29" height="37" fill="url(#speaker-mesh)"/><circle cx="14.5" cy="24" r="11" fill="#505c4b" stroke="#8a9478" strokeWidth="1" className={sound ? "speaker-cone is-playing" : "speaker-cone"}/><circle cx="14.5" cy="24" r="5" fill="#768466"/><circle cx="14.5" cy="6" r="4" fill="#b3a882"/><circle cx="26" cy="2" r="1.3" fill={sound ? "#c3de98" : "#c6b28a"}/></g>
        <g className={`music-notes${sound ? " is-playing" : ""}`} transform={front(505,244,105)} fill="#a18b60" fontFamily="Georgia" fontSize="19"><text>♪</text><text x="16" y="-17">♫</text></g>
      </g><ObjectTag x={485} y={244} z={120} label="Music & dance"/>
    </Hotspot>
  </>;
}

export default function Apartment({ onOpen, hovered, onHover, night, sound }) {
  const common = { onOpen, hovered, onHover };
  return <svg className="apartment-illustration" viewBox="0 0 1200 680" xmlns="http://www.w3.org/2000/svg" aria-labelledby="room-title room-description">
    <title id="room-title">Rex’s Internet Apartment</title><desc id="room-description">A sunlit apartment with a bookshelf and desk against the back wall, a sofa facing a coffee table, and space to walk between them. Explore books, a Vancouver to San Francisco to New York map, side projects on the laptop, music on the speaker, photos on the camera, and a Berkeley diploma.</desc>
    <defs>
      <linearGradient id="wall" x2="0" y2="1"><stop stopColor="#f3ead8"/><stop offset="1" stopColor="#e8dcc5"/></linearGradient>
      <linearGradient id="floor" x2=".5" y2="1"><stop stopColor="#e6c79e"/><stop offset="1" stopColor="#f2ddbc"/></linearGradient>
      <linearGradient id="sky" x2="0" y2="1"><stop stopColor={night ? "#253c58" : "#b9d3cd"}/><stop offset="1" stopColor={night ? "#697282" : "#e2e6cf"}/></linearGradient>
      <radialGradient id="lamp-glow"><stop stopColor="#ffe6a1" stopOpacity=".7"/><stop offset="1" stopColor="#ffe6a1" stopOpacity="0"/></radialGradient>
      <pattern id="rug" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#dfb499"/><path d="M0 2h8M2 0v8" stroke="#ae7f65" strokeOpacity=".13" strokeWidth=".8"/></pattern>
      <pattern id="speaker-mesh" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#66705a"/><circle cx="1" cy="1" r=".5" fill="#a4ab8c"/></pattern>
      <filter id="room-shadow" x="-20%" y="-20%" width="150%" height="160%"><feDropShadow dx="0" dy="13" stdDeviation="14" floodColor="#786149" floodOpacity=".12"/></filter>
      <filter id="object-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#634e38" floodOpacity=".16"/></filter>
      <clipPath id="window-clip"><rect width="190" height="137"/></clipPath>
    </defs>
    <RoomShell night={night}/>
    <Window night={night}/>
    <Hotspot id="travel" label="travel logs and favorite places" {...common}>
      <g transform={front(234,2,227)} filter="url(#object-shadow)">
        <rect x="-6" y="-6" width="174" height="119" rx="1" fill="#b9986c" stroke="#927550" strokeWidth="1.5"/><rect width="162" height="107" fill="#f3ecd9" stroke="#e6d9bd" strokeWidth="5"/>
        <g transform="scale(.9 .85)" fill="#c2c8a8"><path d="m13 32 18-13 23 2 9 12 16 5-7 16-17 3-2 17-14-9-8-14-14-6Z"/><path d="m58 67 17 2 11 18-11 23-9-5-4-22Z"/><path d="m94 24 14-5 10 10 20-4 27 17-8 11-21-5-4 18-15-5-12-16-15-6Z"/><path d="m103 53 23 3 7 18-15 23-11-10-6-21Z"/><path d="m147 89 16-8 11 15-17 7Z"/>
          <path className="map-route" d="M36 37q-13 16 8 29Q55 40 74 46" fill="none" stroke="#b76042" strokeWidth="1.7" strokeDasharray="3 3"/>
          <g fill="#b76042" stroke="#fff5e3" strokeWidth="1.5"><circle cx="36" cy="37" r="3.6"/><circle cx="44" cy="66" r="3.6"/><circle cx="74" cy="46" r="3.6"/></g>
          <g fontFamily="Arial, sans-serif" fontSize="7" fill="#6e664f"><text x="10" y="29">VANCOUVER</text><text x="29" y="78">SF</text><text x="77" y="43">NYC</text></g>
        </g><text x="81" y="101" textAnchor="middle" fontSize="5.5" letterSpacing="1.7" fill="#87765c">OH, THE PLACES</text>
      </g><ObjectTag x={315} y={2} z={250} label="Travel"/>
    </Hotspot>
    <Hotspot id="berkeley" label="the Berkeley journey" {...common}>
      <g transform={`matrix(.5 .5 0 1 ${project(718,112,216).join(" ")})`} filter="url(#object-shadow)">
        <rect x="-5" y="-5" width="106" height="77" fill="#977b56" stroke="#7e684b" strokeWidth="2"/><rect width="96" height="67" fill="#f3ead4"/><rect x="5" y="5" width="86" height="57" fill="none" stroke="#bfb08c"/>
        <text x="48" y="24" textAnchor="middle" fill="#435850" fontSize="14" fontFamily="Georgia, serif">Berkeley</text><path d="M22 33h52m-45 5h38m-33 5h28" stroke="#b3a584" strokeWidth="1"/><circle cx="48" cy="53" r="6" fill="#bd9e55"/>
      </g><ObjectTag x={718} y={160} z={246} label="Berkeley"/>
    </Hotspot>
    <Bookshelf common={common}/>
    <Desk common={common} night={night}/>
    <Plant x={660} y={145} scale={.9}/>
    <Sofa/>
    <Speaker common={common} sound={sound}/>
    <CoffeeTable/>
    <g transform={`translate(${project(433,352,2).join(" ")}) scale(.65)`}>
      <g className="sleeping-cat"><ellipse cy="6" rx="38" ry="10" fill="#846744" opacity=".12"/><path d="M-28 0q-7-25 22-22t28 25Z" fill="#c38e5b" stroke="#9e7049" strokeWidth="1.5"/><path d="M13-8 12-24l11 8 11-3-1 14Q24 7 13-8" fill="#d0a16f" stroke="#9e7049" strokeWidth="1.5"/><path d="M19-7q3 3 5 0m3 0 4-2" fill="none" stroke="#765d43" strokeWidth="1.5"/><path d="M-21 1q-24-9-16-20 5-7 10-2" fill="none" stroke="#c38e5b" strokeWidth="9" strokeLinecap="round"/><path d="m-8-19-4 9m13-7-4 9" stroke="#ac764a" strokeWidth="3"/><text className="cat-zzz" x="36" y="-26" fontSize="13" fill="#a79372" fontFamily="Georgia">z z</text></g>
    </g>
    <g fill="#d7b577" className="floating-dust"><circle cx="440" cy="315" r="1.5"/><circle cx="674" cy="252" r="1.5"/><circle cx="609" cy="321" r="1.5"/></g>
  </svg>;
}
