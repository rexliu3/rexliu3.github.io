import React from "react";
import { project } from "./geometry";

export function Hotspot({ id, panelId = id, label, children, onOpen, hovered, onHover }) {
  return (
    <g
      role="button"
      tabIndex="0"
      aria-label={`Explore ${label}`}
      className={`room-object ${hovered === id ? "is-highlighted" : ""}`}
      onClick={() => onOpen(panelId)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(panelId);
        }
      }}
    >
      {children}
    </g>
  );
}
export function ObjectTag({ x, y, z, label, visible = false }) {
  return (
    <g
      aria-hidden="true"
      className={`object-tag${visible ? " is-visible" : ""}`}
      transform={`translate(${project(x, y, z).join(" ")})`}
    >
      <rect
        x={-(label.length * 3.6 + 17)}
        y="-15"
        width={label.length * 7.2 + 34}
        height="30"
        rx="15"
      />
      <text textAnchor="middle" y="4">
        {label} ↗
      </text>
    </g>
  );
}
