import React, { useState } from "react";
import { ObjectTag } from "./Hotspot";
import { project } from "./geometry";

export default function Cat({ hovered, onHover }) {
  const [reaction, setReaction] = useState(0);
  const reactions = ["Sleeping", "Surprised", "Happy", "Stretching"];
  const interact = () => setReaction((current) => (current + 1) % reactions.length);
  return (
    <g transform={`translate(${project(433, 352, 2).join(" ")}) scale(.65)`}>
      <g
        role="button"
        tabIndex="0"
        aria-label={`Pet the cat. ${reactions[reaction]}.`}
        className={`room-object apartment-cat cat-reaction-${reaction}${hovered === "cat" ? " is-highlighted" : ""}`}
        onClick={interact}
        onMouseEnter={() => onHover("cat")}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover("cat")}
        onBlur={() => onHover(null)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            interact();
          }
        }}
      >
        <ellipse className="cat-hit-area" cy="-10" rx="54" ry="38" fill="transparent" />
        <g className="cat-motion">
          <ellipse cy="6" rx="38" ry="10" fill="#846744" opacity=".12" />
          <path
            className="cat-body"
            d="M-28 0q-7-25 22-22t28 25Z"
            fill="#c38e5b"
            stroke="#9e7049"
            strokeWidth="1.5"
          />
          <g className="cat-head">
            <path
              d="M13-8 12-24l11 8 11-3-1 14Q24 7 13-8"
              fill="#d0a16f"
              stroke="#9e7049"
              strokeWidth="1.5"
            />
            {reaction === 0 ? (
              <path d="M19-7q3 3 5 0m3 0 4-2" fill="none" stroke="#765d43" strokeWidth="1.5" />
            ) : (
              <>
                <circle cx="21" cy="-8" r="1.6" fill="#594a37" />
                <circle cx="29" cy="-9" r="1.6" fill="#594a37" />
                <path d="M24-4q2 2 4-.5" fill="none" stroke="#765d43" strokeWidth="1.2" />
              </>
            )}
          </g>
          <path
            className="cat-tail"
            d="M-21 1q-24-9-16-20 5-7 10-2"
            fill="none"
            stroke="#c38e5b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="m-8-19-4 9m13-7-4 9" stroke="#ac764a" strokeWidth="3" />
          <text
            className="cat-emote"
            x="36"
            y="-26"
            fontSize="13"
            fill="#a79372"
            fontFamily="Georgia"
          >
            {["z z", "!", "♥", "prrr"][reaction]}
          </text>
        </g>
        <ObjectTag x={0} y={0} z={0} label="Pet the cat" />
      </g>
    </g>
  );
}
