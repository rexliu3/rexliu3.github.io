import React from "react";
import { Icon } from "./Icon";

export default function ApartmentNavigation({ rooms, onOpen, onHover }) {
  return (
    <nav className="explore-nav" aria-label="Explore the apartment">
      {rooms.map((room) => (
        <button
          type="button"
          key={room.id}
          onClick={() => onOpen(room.id)}
          onMouseEnter={() => onHover(room.id)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(room.id)}
          onBlur={() => onHover(null)}
        >
          <Icon name={room.icon} size={20} />
          <span>{room.short}</span>
          <span className="nav-arrow">↗</span>
        </button>
      ))}
    </nav>
  );
}
