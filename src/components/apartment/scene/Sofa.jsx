import React from "react";
import { Box, Shadow, Face, Edge } from "./primitives";
import { front } from "./geometry";

function Pillow({ x, y, z, color, accent, tilt = 0, pattern = false }) {
  return (
    <g className="sofa-pillow" transform={front(x, y, z)}>
      <g transform={`rotate(${tilt} 24 20)`}>
        <path
          d="M6 6C16 1 34 0 43 5c5 9 6 24 0 33-10 5-29 5-40 0C-1 28 0 14 6 6Z"
          fill="#5d5543"
          opacity=".16"
          transform="translate(2 4)"
        />
        <path
          d="M6 3C16-1 34-2 43 4c5 9 6 24 0 33-10 5-29 5-40 0C-1 27 0 11 6 3Z"
          fill={color}
          stroke={accent}
          strokeWidth="1.7"
        />
        <path d="M3 37c11-4 29-4 40 0-10 5-29 5-40 0Z" fill={accent} opacity=".4" />
        <path d="M43 4c5 9 6 24 0 33-2-5-3-27 0-33Z" fill={accent} opacity=".25" />
        <path
          d="M7 6C17 2 33 2 40 6"
          fill="none"
          stroke="#fff9e9"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity=".55"
        />
        <path
          d="M6 3C16-1 34-2 43 4c5 9 6 24 0 33-10 5-29 5-40 0C-1 27 0 11 6 3Z"
          fill="none"
          stroke="#f8ebd0"
          strokeWidth=".7"
          strokeDasharray="2.2 2.2"
          opacity=".8"
          transform="scale(.91) translate(2.4 2.2)"
        />
        <path
          d="M22 17q3 3 6 0M22 23q3-3 6 0"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          opacity=".55"
        />
        {pattern && (
          <g fill="none" stroke="#f1b08d" strokeWidth="1" opacity=".75">
            <path d="M9 11 17 6l8 5-8 5Zm16 0 8-5 8 5-8 5ZM9 25l8-5 8 5-8 5Zm16 0 8-5 8 5-8 5" />
            <path d="M5 18h39" opacity=".45" />
          </g>
        )}
        <circle cx="1.5" cy="5" r="1.5" fill={accent} />
        <circle cx="44" cy="36" r="1.5" fill={accent} />
      </g>
    </g>
  );
}

export default function Sofa() {
  const green = { top: "#a7b38f", side: "#7b8d69", face: "#92a17d", stroke: "#728260" };
  return (
    <g>
      <Shadow x={153} y={188} w={268} d={112} />
      {[
        [164, 200],
        [164, 280],
        [402, 200],
        [402, 280],
      ].map(([x, y]) => (
        <Box key={`${x}-${y}`} x={x} y={y} w={6} d={6} h={16} face="#a28258" side="#8e704b" />
      ))}
      <Box x={155} y={190} z={14} w={260} d={100} h={25} {...green} />
      <Box x={155} y={190} z={39} w={260} d={18} h={49} {...green} />
      {[175, 287].map((x) => (
        <Box key={x} x={x} y={210} z={39} w={108} d={76} h={12} {...green} top="#b1bc9a" />
      ))}
      <Box x={155} y={208} z={39} w={18} d={82} h={31} {...green} />
      <Box x={397} y={208} z={39} w={18} d={82} h={31} {...green} />
      <Pillow x={181} y={219} z={79} color="url(#pillow-cream)" accent="#b3a37f" tilt={-3} />
      <Pillow x={237} y={223} z={76} color="url(#pillow-rust)" accent="#9d5f47" tilt={4} pattern />
      <Face
        vertices={[
          [332, 231, 52],
          [367, 231, 52],
          [367, 290, 52],
          [332, 290, 52],
        ]}
        fill="#d9c9a6"
        stroke="#b4a47f"
        strokeWidth="1"
      />
      <Face
        vertices={[
          [332, 291, 52],
          [367, 291, 52],
          [367, 291, 17],
          [332, 291, 17],
        ]}
        fill="#d5c29f"
        stroke="#b4a47f"
        strokeWidth="1"
      />
      {[338, 349, 360].map((x) => (
        <g key={x} stroke="#f1e5cb" strokeWidth="2">
          <Edge from={[x, 231, 52.5]} to={[x, 291, 52.5]} />
          <Edge from={[x, 291, 52.5]} to={[x, 291, 18]} />
        </g>
      ))}
    </g>
  );
}
