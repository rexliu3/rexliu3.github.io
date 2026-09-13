import React from "react";
import { Box, Shadow } from "./primitives";
import { Hotspot, ObjectTag } from "./Hotspot";
import { front, floor, project } from "./geometry";

export default function Desk({ common, night }) {
  return (
    <>
      <Shadow x={429} y={14} w={216} d={86} />
      {[
        [439, 22],
        [439, 83],
        [629, 22],
        [629, 83],
      ].map(([x, y]) => (
        <Box
          key={`${x}-${y}`}
          x={x}
          y={y}
          w={5}
          d={5}
          h={72}
          top="#b99164"
          face="#b99164"
          side="#a27b52"
        />
      ))}
      <Box x={585} y={24} z={49} w={49} d={64} h={23} />
      <g transform={front(590, 89, 66)} stroke="#a27d53" fill="none">
        <path d="M0 0h39m-25 6h11m-25 7h39m-25 6h11" strokeWidth="1.3" />
      </g>
      <Box x={435} y={18} z={72} w={205} d={75} h={5} />

      <g className="desk-lamp" transform={`translate(${project(612, 34, 78).join(" ")})`}>
        {night && <ellipse cx="-15" cy="-20" rx="62" ry="50" fill="url(#lamp-glow)" />}
        <ellipse rx="14" ry="5" fill="#b9a276" stroke="#97805a" strokeWidth="1.2" />
        <path d="M0-2v-38l-17-16" fill="none" stroke="#8c805e" strokeWidth="3.5" />
        <circle cy="-38" r="3" fill="#c6b184" stroke="#97805a" />
        <path d="m-25-62 17 5 4 18-33-9Z" fill="#d6b36e" stroke="#a28753" strokeWidth="1.2" />
        <path d="m-37-48 33 9" stroke="#f9e4a4" strokeWidth="2.5" />
      </g>
      <Hotspot id="projects" label="things built for fun" {...common}>
        <g>
          <Box
            x={494}
            y={41}
            z={77}
            w={55}
            d={34}
            h={2}
            top="#bec5b5"
            side="#8e9c8c"
            face="#9ca995"
            stroke="#697b6b"
          />
          <g transform={front(494, 41, 116)}>
            <path d="M2 0h51l2 38H0Z" fill="#8c9b8d" stroke="#687969" strokeWidth="1.3" />
            <path d="M6 4h43l2 29H4Z" fill="#344e45" />
            <g stroke="#96b38c" strokeWidth="1.5" strokeLinecap="round">
              <path d="M11 10h11m-9 5h22m-19 5h12m-15 5h22" />
              <path className="screen-cursor" d="M36 25h5" stroke="#e0bd76" />
            </g>
          </g>
          <g transform={floor(499, 48, 79.5)}>
            <rect width="45" height="17" rx="1" fill="#849684" />
            {[4, 9, 14].map((y) => (
              <path key={y} d={`M3 ${y}h39`} stroke="#b5c0a8" strokeWidth="1" />
            ))}
            <rect x="16" y="20" width="15" height="7" rx="1" fill="#a6b39e" />
          </g>
          <rect transform={front(490, 55, 119)} width="64" height="59" fill="transparent" />
        </g>
        <ObjectTag x={521} y={47} z={143} label="Side projects" />
      </Hotspot>
      <g transform={`translate(${project(465, 57, 78).join(" ")})`}>
        <ellipse cy="1" rx="11" ry="4" fill="#a68d6c" opacity=".25" />
        <path d="M-7-13H7v12q-7 6-14 0Z" fill="#f4ebd6" stroke="#a08d6b" strokeWidth="1" />
        <ellipse cy="-13" rx="7" ry="2.5" fill="#806346" />
        <path d="M7-10q10-1 8 5-1 5-8 3" fill="none" stroke="#a08d6b" strokeWidth="1.4" />
        <g
          className="coffee-steam"
          fill="none"
          stroke="#fffaf0"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M-4-18q-5-5 0-11t0-10" />
          <path d="M1-18q5-6 0-12t0-8" />
          <path d="M5-17q-4-5 0-10t0-8" />
        </g>
      </g>
      <Hotspot id="photos" label="photos" {...common}>
        <g transform={front(570, 75, 97)} stroke="#535f4e" strokeWidth="1.1">
          <rect x="-9" y="-10" width="48" height="45" fill="transparent" stroke="none" />
          <path d="M0 3h7l3-4h9l3 4h8v18H0Z" fill="#66725d" />
          <path d="M0 7h30v5H0Z" fill="#a5ac98" />
          <circle cx="16" cy="12" r="9" fill="#42584d" />
          <circle cx="16" cy="12" r="6" fill="#7d9a8a" />
          <circle cx="16" cy="12" r="3.5" fill="#334e46" />
          <circle cx="18" cy="10" r="1.7" fill="#d1dfc2" stroke="none" />
          <path d="M30 7q15 18-3 21L10 25" fill="none" stroke="#8b7454" strokeWidth="1.5" />
        </g>
        <ObjectTag x={586} y={80} z={124} label="Photos" />
      </Hotspot>
      {/* A usable chair faces the desk, with space behind it to walk through. */}
      <g>
        {[
          [504, 116],
          [504, 159],
          [550, 116],
          [550, 159],
        ].map(([x, y]) => (
          <Box key={`${x}-${y}`} x={x} y={y} w={4} d={4} h={44} face="#ac895e" side="#95744e" />
        ))}
        <Box
          x={500}
          y={112}
          z={43}
          w={58}
          d={55}
          h={7}
          top="#9eaa8c"
          side="#77876b"
          face="#879777"
          stroke="#768366"
        />
        <Box
          x={500}
          y={159}
          z={49}
          w={58}
          d={8}
          h={35}
          top="#a9b596"
          side="#819072"
          face="#95a484"
          stroke="#768366"
        />
      </g>
    </>
  );
}
