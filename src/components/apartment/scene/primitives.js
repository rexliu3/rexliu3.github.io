import React from "react";
import { project, points, floor } from "./geometry";

export function Face({ vertices, ...props }) {
  return <polygon points={points(vertices)} {...props} />;
}
export function Edge({ from, to, ...props }) {
  const [x1, y1] = project(...from),
    [x2, y2] = project(...to);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...props} />;
}
export function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  top = "#dbb88a",
  side = "#af875c",
  face = "#c39b6c",
  stroke = "#907353",
}) {
  return (
    <g stroke={stroke} strokeWidth="1.3" strokeLinejoin="round">
      <Face
        vertices={[
          [x, y, z],
          [x, y + d, z],
          [x, y + d, z + h],
          [x, y, z + h],
        ]}
        fill={side}
      />
      <Face
        vertices={[
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ]}
        fill={face}
      />
      <Face
        vertices={[
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ]}
        fill={top}
      />
    </g>
  );
}
export function Shadow({ x, y, w, d }) {
  return (
    <rect transform={floor(x, y, 0.5)} width={w} height={d} rx="12" fill="#685642" opacity=".1" />
  );
}
