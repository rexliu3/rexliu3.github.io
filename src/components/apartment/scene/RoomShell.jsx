import React from "react";
import { Face, Edge } from "./primitives";
import { floor } from "./geometry";

export default function RoomShell({ night, raining }) {
  return (
    <>
      <g filter="url(#room-shadow)" stroke="#a78e6d" strokeWidth="1.4" strokeLinejoin="round">
        <Face
          vertices={[
            [0, 0, 0],
            [720, 0, 0],
            [720, 420, 0],
            [0, 420, 0],
          ]}
          fill="url(#floor)"
        />
        <Face
          vertices={[
            [0, 0, 0],
            [720, 0, 0],
            [720, 0, 280],
            [0, 0, 280],
          ]}
          fill="url(#wall)"
        />
        <Face
          vertices={[
            [720, 0, 0],
            [720, 420, 0],
            [720, 420, 280],
            [720, 0, 280],
          ]}
          fill="#dfd1b9"
        />
        <Face
          vertices={[
            [0, 0, 0],
            [0, 420, 0],
            [0, 420, -12],
            [0, 0, -12],
          ]}
          fill="#c5a47e"
        />
        <Face
          vertices={[
            [0, 420, 0],
            [720, 420, 0],
            [720, 420, -12],
            [0, 420, -12],
          ]}
          fill="#d0b18a"
        />
        <Face
          vertices={[
            [0, 1, 0],
            [720, 1, 0],
            [720, 1, 10],
            [0, 1, 10],
          ]}
          fill="#f2e6cf"
        />
        <Face
          vertices={[
            [719, 0, 0],
            [719, 420, 0],
            [719, 420, 10],
            [719, 0, 10],
          ]}
          fill="#ecdec3"
        />
        <g stroke="#bd9b70" strokeWidth=".8" opacity=".5">
          {Array.from({ length: 13 }, (_, i) => (
            <Edge key={i} from={[0, (i + 1) * 30, 0.3]} to={[720, (i + 1) * 30, 0.3]} />
          ))}
          {Array.from({ length: 14 }, (_, row) =>
            [0, 1, 2].map((column) => (
              <Edge
                key={`${row}-${column}`}
                from={[80 + column * 230 + (row % 2) * 90, row * 30, 0.3]}
                to={[80 + column * 230 + (row % 2) * 90, (row + 1) * 30, 0.3]}
              />
            ))
          )}
        </g>
      </g>
      {!night && !raining && (
        <Face
          className="sunbeam"
          vertices={[
            [449, 5, 1],
            [630, 5, 1],
            [468, 265, 1],
            [287, 265, 1],
          ]}
          fill="#fff0bc"
          opacity=".22"
        />
      )}
      <g transform={floor(145, 205, 1)} strokeLinejoin="round">
        <rect width="325" height="195" rx="3" fill="url(#rug)" stroke="#bc8c71" strokeWidth="2" />
        <rect
          x="9"
          y="9"
          width="307"
          height="177"
          rx="1"
          fill="none"
          stroke="#f1d5b8"
          strokeWidth="4"
        />
        <rect
          x="17"
          y="17"
          width="291"
          height="161"
          fill="none"
          stroke="#bd9277"
          strokeWidth="1.2"
        />
        {Array.from({ length: 32 }, (_, i) => (
          <path
            key={i}
            d={`M${7 + i * 10} 195v8M${7 + i * 10} 0v-8`}
            stroke="#c19879"
            strokeWidth="1.2"
          />
        ))}
      </g>
    </>
  );
}
