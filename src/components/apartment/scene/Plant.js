import React from "react";
import { project } from "./geometry";

export default function Plant({ x, y, z = 0, scale = 1 }) {
  const [sx, sy] = project(x, y, z);
  return (
    <g transform={`translate(${sx} ${sy}) scale(${scale})`}>
      <ellipse cy="2" rx="25" ry="7" fill="#72573f" opacity=".12" />
      <path d="M-19-32h38L14 0Q0 8-14 0Z" fill="#bd805a" stroke="#92704e" strokeWidth="1.5" />
      <ellipse cy="-32" rx="19" ry="6" fill="#8d694b" />
      <g className="plant-leaves" style={{ animationDelay: `${-x / 70}s` }}>
        <path
          d="M0-32v-70m0 37-25-25m25 11 24-28M0-84l-15-23"
          stroke="#718153"
          strokeWidth="2.5"
          fill="none"
        />
        <path d="M0-54Q-37-54-34-83Q-6-88 0-54" fill="#879b6c" />
        <path d="M1-70Q4-104 31-102Q35-74 1-70" fill="#6e875a" />
        <path d="M0-88Q-28-79-25-113Q-1-116 0-88" fill="#94a67a" />
        <path d="M1-91Q-3-117 16-128Q34-105 1-91" fill="#71895b" />
        <path d="M-4-58-25-77M6-78l19-19" stroke="#b3bf90" fill="none" />
      </g>
      <path d="m-12-25 3 23" stroke="#d7a17a" strokeWidth="2.5" />
    </g>
  );
}
