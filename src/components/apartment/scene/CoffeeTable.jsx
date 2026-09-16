import React from "react";
import { Box, Shadow } from "./primitives";
import { Hotspot, ObjectTag } from "./Hotspot";
import { floor } from "./geometry";

export default function CoffeeTable({ common, sound }) {
  return (
    <g>
      <Shadow x={240} y={321} w={133} d={66} />
      {[
        [252, 334],
        [351, 334],
        [252, 375],
        [351, 375],
      ].map(([x, y]) => (
        <Box key={`${x}-${y}`} x={x} y={y} w={5} d={5} h={38} face="#b78d5f" side="#98764e" />
      ))}
      <rect
        transform={floor(235, 320, 37)}
        width="135"
        height="65"
        rx="24"
        fill="#b98d5f"
        stroke="#97764f"
        strokeWidth="1.5"
      />
      <rect
        transform={floor(235, 320, 42)}
        width="135"
        height="65"
        rx="24"
        fill="#dfbd8e"
        stroke="#a9885c"
        strokeWidth="1.5"
      />
      <g transform={floor(330, 342, 43)}>
        <rect width="24" height="27" fill="#f8efd9" stroke="#b7a383" />
        <path d="M4 6h16M4 10h12M4 19h16" stroke="#c4b594" />
      </g>
      <Hotspot id="music" label="the record player — choose café jazz" {...common}>
        <g>
          <Box
            x={258}
            y={329}
            z={43}
            w={65}
            d={43}
            h={8}
            top="#bc926c"
            face="#a47750"
            side="#906b48"
            stroke="#806447"
          />
          <g transform={floor(258, 329, 51)}>
            <rect x="3" y="3" width="59" height="37" rx="2" fill="#d1b18b" />
            <g transform="translate(25 21)">
              <g className={`table-vinyl${sound ? " is-playing" : ""}`}>
                <circle r="17" fill="#343c32" stroke="#59604e" />
                {[10, 13, 15].map((r) => (
                  <circle key={r} r={r} fill="none" stroke="#626650" strokeWidth=".5" />
                ))}
                <path
                  d="M-14-6A15 15 0 0 1-6-14M6 14A15 15 0 0 0 14 6"
                  fill="none"
                  stroke="#92917b"
                  strokeWidth="1.5"
                  opacity=".65"
                />
                <circle r="6" fill="#b96743" />
                <path d="M-3-2h6M-2 2h4" stroke="#eadab8" strokeWidth=".8" />
                <circle r="1.3" fill="#ddd5bb" />
              </g>
            </g>
            <circle cx="53" cy="8" r="3" fill="#7b785f" />
            <g transform="translate(53 8)">
              <path
                className={`table-tonearm${sound ? " is-playing" : ""}`}
                d="M0 0v24l-3 3"
                fill="none"
                stroke="#e4dcc3"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
            <circle cx="56" cy="35" r="2" fill={sound ? "#b8d28d" : "#8f8568"} />
          </g>
          <rect transform={floor(250, 320, 53)} width="80" height="57" rx="5" fill="transparent" />
        </g>
        <ObjectTag x={290} y={343} z={85} label="Café jazz" />
      </Hotspot>
    </g>
  );
}
