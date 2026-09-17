import React from "react";

export default function SceneDefinitions({ night, raining }) {
  return (
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
        <stop stopColor={night ? "#253c58" : raining ? "#899fa6" : "#b9d3cd"} />
        <stop offset="1" stopColor={night ? "#697282" : raining ? "#b7c6c7" : "#e2e6cf"} />
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
      <clipPath id="portrait-clip">
        <rect x="7" y="7" width="40" height="51" rx="1" />
      </clipPath>
    </defs>
  );
}
