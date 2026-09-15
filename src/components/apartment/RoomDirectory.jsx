import React, { useState } from "react";
import { Icon } from "./Icon";

export default function RoomDirectory({ rooms, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const matches = rooms.filter((room) =>
    `${room.short} ${room.name} ${room.lede}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section className="room-directory" aria-labelledby="directory-title" id="room-directory">
      <div className="directory-heading">
        <div>
          <p className="eyebrow">A SHORTCUT TO EVERY CORNER</p>
          <h2 id="directory-title">What brings you in?</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Close room directory"
        >
          <Icon name="close" />
        </button>
      </div>
      <label className="directory-search">
        <Icon name="search" size={18} />
        <span className="sr-only">Find a room</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try projects, photography, or résumé…"
        />
      </label>
      <p className="sr-only" role="status">
        {matches.length} {matches.length === 1 ? "room" : "rooms"} found
      </p>
      <div className="directory-grid">
        {matches.map((room) => (
          <button
            type="button"
            key={room.id}
            aria-label={`${room.short} ${room.name}`}
            onClick={() => onOpen(room.id)}
          >
            <Icon name={room.icon} />
            <span>
              <strong>{room.short}</strong>
              <small>{room.name}</small>
            </span>
            <Icon name="arrow" size={16} />
          </button>
        ))}
      </div>
      {!matches.length && (
        <p className="directory-empty">
          No corners found. Try “travel” or “music”, or{" "}
          <button type="button" onClick={() => setQuery("")}>
            show every room
          </button>
          .
        </p>
      )}
    </section>
  );
}
