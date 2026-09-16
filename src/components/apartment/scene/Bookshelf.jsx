import React from "react";
import { Box, Shadow } from "./primitives";
import Plant from "./Plant";
import { Hotspot, ObjectTag } from "./Hotspot";
import { front } from "./geometry";

export default function Bookshelf({ common }) {
  const bookColors = ["#83967b", "#d5b97d", "#b77556", "#cfc5a3", "#7d9490", "#ae895a"];
  return (
    <>
      <Shadow x={36} y={18} w={134} d={43} />
      <Hotspot id="books" label="books I like" {...common}>
        <g>
          <Box x={40} y={12} w={125} d={34} h={192} />
          <g transform={front(46, 47, 185)}>
            <rect width="113" height="177" fill="#97724f" />
            {[0, 1, 2].map((row) => (
              <g key={row} transform={`translate(0 ${row * 58})`}>
                {bookColors.map((color, index) => (
                  <g key={color} transform={`translate(${5 + index * 17} ${10 + (index % 3) * 4})`}>
                    <rect
                      width={index === 2 ? 14 : 12}
                      height={43 - (index % 3) * 4}
                      rx=".6"
                      fill={color}
                      stroke="#7f6449"
                      strokeWidth=".8"
                    />
                    <path d="M4 6v23M3 35h6" stroke="#f3e5c7" strokeWidth="1" opacity=".65" />
                  </g>
                ))}
                <rect
                  x="-6"
                  y="53"
                  width="125"
                  height="5"
                  fill="#d6ad7d"
                  stroke="#9b7853"
                  strokeWidth="1"
                />
              </g>
            ))}
          </g>
        </g>
        <ObjectTag x={102} y={48} z={216} label="Books" />
      </Hotspot>
      <Plant x={76} y={29} z={192} scale={0.42} />
    </>
  );
}
