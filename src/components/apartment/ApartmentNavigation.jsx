import React from "react";
import { Icon } from "./Icon";
import { getContentRooms } from "./rooms";

export default function ApartmentNavigation({ rooms, onOpen, onHover }) {
  return (
    <nav className="explore-nav" id="explore" tabIndex={-1} aria-label="Explore the apartment">
      {getContentRooms(rooms).map((room, index) => (
        <button
          type="button"
          key={room.id}
          onClick={() => onOpen(room.id)}
          onMouseEnter={() => onHover(room.id)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(room.id)}
          onBlur={() => onHover(null)}
        >
          <span className="nav-number" aria-hidden="true">
            0{index + 1}
          </span>
          <Icon name={room.icon} size={20} />
          <span>{room.short}</span>
          <Icon name="arrow" size={14} className="nav-arrow" />
        </button>
      ))}
    </nav>
  );
}
