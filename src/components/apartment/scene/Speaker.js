import React from "react";
import { Box, Shadow } from "./primitives";
import { Hotspot, ObjectTag } from "./Hotspot";
import { front } from "./geometry";

export default function Speaker({ common, sound }) {
  return (
    <>
      <Shadow x={448} y={211} w={76} d={69} />
      {[
        [454, 218],
        [454, 267],
        [508, 218],
        [508, 267],
      ].map(([x, y]) => (
        <Box key={`${x}-${y}`} x={x} y={y} w={4} d={4} h={14} />
      ))}
      <Box x={450} y={210} z={12} w={70} d={65} h={38} />
      <g transform={front(457, 276, 42)}>
        <rect width="56" height="21" fill="none" stroke="#a58257" strokeWidth="1" />
        <path d="M23 9h11" stroke="#8e734e" strokeWidth="2" />
      </g>
      <Hotspot id="speaker" panelId="music" label="music and dance" {...common}>
        <g>
          <Box
            x={466}
            y={224}
            z={50}
            w={35}
            d={25}
            h={44}
            top="#c2ab7f"
            face="#686d57"
            side="#9d855e"
            stroke="#807253"
          />
          <g transform={front(469, 250, 90)}>
            <rect width="29" height="37" fill="url(#speaker-mesh)" />
            <circle
              cx="14.5"
              cy="24"
              r="11"
              fill="#505c4b"
              stroke="#8a9478"
              strokeWidth="1"
              className={sound ? "speaker-cone is-playing" : "speaker-cone"}
            />
            <circle cx="14.5" cy="24" r="5" fill="#768466" />
            <circle cx="14.5" cy="6" r="4" fill="#b3a882" />
            <circle cx="26" cy="2" r="1.3" fill={sound ? "#c3de98" : "#c6b28a"} />
          </g>
          <g
            className={`music-notes${sound ? " is-playing" : ""}`}
            transform={front(505, 244, 105)}
            fill="#a18b60"
            fontFamily="Georgia"
            fontSize="19"
          >
            <text>♪</text>
            <text x="16" y="-17">
              ♫
            </text>
          </g>
        </g>
        <ObjectTag x={485} y={244} z={120} label="Music & dance" />
      </Hotspot>
    </>
  );
}
