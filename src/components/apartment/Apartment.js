import React from "react";
import { front, project } from "./scene/geometry";
import { Hotspot, ObjectTag } from "./scene/Hotspot";
import RoomShell from "./scene/RoomShell";
import Window from "./scene/Window";
import Bookshelf from "./scene/Bookshelf";
import Desk from "./scene/Desk";
import Sofa from "./scene/Sofa";
import CoffeeTable from "./scene/CoffeeTable";
import Speaker from "./scene/Speaker";
import Cat from "./scene/Cat";
import Plant from "./scene/Plant";

export default function Apartment({ onOpen, hovered, onHover, night, sound }) {
  const common = { onOpen, hovered, onHover };
  return (
    <svg
      className="apartment-illustration"
      viewBox="0 0 1200 680"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="room-title room-description"
    >
      <title id="room-title">Rex’s Internet Apartment</title>
      <desc id="room-description">
        A sunlit apartment with a bookshelf and desk against the back wall, a sofa facing a coffee
        table, and space to walk between them. Explore books, a Vancouver to San Francisco to New
        York map, side projects on the laptop, five café jazz records on the coffee-table turntable,
        music on the speaker, photos on the camera, a résumé on the desk, and a Berkeley diploma.
      </desc>
      <defs>
        <linearGradient id="wall" x2="0" y2="1">
          <stop stopColor="#f3ead8" />
          <stop offset="1" stopColor="#e8dcc5" />
        </linearGradient>
        <linearGradient id="floor" x2=".5" y2="1">
          <stop stopColor="#e6c79e" />
          <stop offset="1" stopColor="#f2ddbc" />
        </linearGradient>
        <linearGradient id="sky" x2="0" y2="1">
          <stop stopColor={night ? "#253c58" : "#b9d3cd"} />
          <stop offset="1" stopColor={night ? "#697282" : "#e2e6cf"} />
        </linearGradient>
        <radialGradient id="lamp-glow">
          <stop stopColor="#ffe6a1" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffe6a1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pillow-cream" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff5d9" />
          <stop offset=".55" stopColor="#eadcb9" />
          <stop offset="1" stopColor="#cabb96" />
        </linearGradient>
        <linearGradient id="pillow-rust" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#da9a76" />
          <stop offset=".55" stopColor="#bd795b" />
          <stop offset="1" stopColor="#9f624b" />
        </linearGradient>
        <pattern id="rug" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#dfb499" />
          <path d="M0 2h8M2 0v8" stroke="#ae7f65" strokeOpacity=".13" strokeWidth=".8" />
        </pattern>
        <pattern id="speaker-mesh" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#66705a" />
          <circle cx="1" cy="1" r=".5" fill="#a4ab8c" />
        </pattern>
        <filter id="room-shadow" x="-20%" y="-20%" width="150%" height="160%">
          <feDropShadow dx="0" dy="13" stdDeviation="14" floodColor="#786149" floodOpacity=".12" />
        </filter>
        <filter id="object-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#634e38" floodOpacity=".16" />
        </filter>
        <clipPath id="window-clip">
          <rect width="190" height="137" />
        </clipPath>
      </defs>
      <RoomShell night={night} />
      <Window night={night} />
      <Hotspot id="travel" label="travel logs and favorite places" {...common}>
        <g transform={front(234, 2, 227)} filter="url(#object-shadow)">
          <rect
            x="-6"
            y="-6"
            width="174"
            height="119"
            rx="1"
            fill="#b9986c"
            stroke="#927550"
            strokeWidth="1.5"
          />
          <rect width="162" height="107" fill="#f3ecd9" stroke="#e6d9bd" strokeWidth="5" />
          <g transform="scale(.9 .85)" fill="#c2c8a8">
            <path d="m13 32 18-13 23 2 9 12 16 5-7 16-17 3-2 17-14-9-8-14-14-6Z" />
            <path d="m58 67 17 2 11 18-11 23-9-5-4-22Z" />
            <path d="m94 24 14-5 10 10 20-4 27 17-8 11-21-5-4 18-15-5-12-16-15-6Z" />
            <path d="m103 53 23 3 7 18-15 23-11-10-6-21Z" />
            <path d="m147 89 16-8 11 15-17 7Z" />
            <path
              className="map-route"
              d="M36 37q-13 16 8 29Q55 40 74 46"
              fill="none"
              stroke="#b76042"
              strokeWidth="1.7"
              strokeDasharray="3 3"
            />
            <g fill="#b76042" stroke="#fff5e3" strokeWidth="1.5">
              <circle cx="36" cy="37" r="3.6" />
              <circle cx="44" cy="66" r="3.6" />
              <circle cx="74" cy="46" r="3.6" />
            </g>
            <g fontFamily="Arial, sans-serif" fontSize="7" fill="#6e664f">
              <text x="10" y="29">
                VANCOUVER
              </text>
              <text x="29" y="78">
                SF
              </text>
              <text x="77" y="43">
                NYC
              </text>
            </g>
          </g>
          <text
            x="81"
            y="101"
            textAnchor="middle"
            fontSize="5.5"
            letterSpacing="1.7"
            fill="#87765c"
          >
            OH, THE PLACES
          </text>
        </g>
        <ObjectTag x={315} y={2} z={250} label="Travel" />
      </Hotspot>
      <Hotspot id="berkeley" label="the Berkeley journey" {...common}>
        <g
          transform={`matrix(.5 .5 0 1 ${project(718, 112, 216).join(" ")})`}
          filter="url(#object-shadow)"
        >
          <rect
            x="-5"
            y="-5"
            width="106"
            height="77"
            fill="#977b56"
            stroke="#7e684b"
            strokeWidth="2"
          />
          <rect width="96" height="67" fill="#f3ead4" />
          <rect x="5" y="5" width="86" height="57" fill="none" stroke="#bfb08c" />
          <text
            x="48"
            y="24"
            textAnchor="middle"
            fill="#435850"
            fontSize="14"
            fontFamily="Georgia, serif"
          >
            Berkeley
          </text>
          <path d="M22 33h52m-45 5h38m-33 5h28" stroke="#b3a584" strokeWidth="1" />
          <circle cx="48" cy="53" r="6" fill="#bd9e55" />
        </g>
        <ObjectTag x={718} y={160} z={246} label="Berkeley" />
      </Hotspot>
      <Bookshelf common={common} />
      <Desk common={common} night={night} />
      <Plant x={660} y={145} scale={0.9} />
      <Sofa />
      <Speaker common={common} sound={sound} />
      <CoffeeTable common={common} sound={sound} />
      <Cat hovered={hovered} onHover={onHover} />
      <g fill="#d7b577" className="floating-dust">
        <circle cx="440" cy="315" r="1.5" />
        <circle cx="674" cy="252" r="1.5" />
        <circle cx="609" cy="321" r="1.5" />
      </g>
    </svg>
  );
}
