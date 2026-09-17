import React, { useState } from "react";
import land from "./worldLand.json";

const visitDate = (city) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(city.year, city.month - 1, 1))
  );
const position = (city) => ({
  left: `${(city.location.lng + 180) / 3.6}%`,
  top: `${(90 - city.location.lat) / 1.8}%`,
});

export default function VisitedCitiesMap({ cities }) {
  const [active, setActive] = useState(null);
  return (
    <section className="visited-cities" aria-labelledby="visited-cities-title">
      <h3 id="visited-cities-title">Cities visited</h3>
      <p className="visited-map-hint">Hover, focus, or tap a marker to see when I visited.</p>
      <div className="visited-world-map" role="group" aria-label="World map of cities visited">
        <svg viewBox="0 0 720 360" aria-hidden="true">
          <path className="world-land" d={land.path} />
          <path className="world-equator" d="M0 180h720" />
        </svg>
        {cities.map((city) => (
          <button
            className={`visited-city-marker${active?._id === city._id ? " is-active" : ""}`}
            type="button"
            key={city._id}
            style={position(city)}
            aria-label={`${city.name}, ${visitDate(city)}`}
            aria-describedby={active?._id === city._id ? "visited-city-tooltip" : undefined}
            onMouseEnter={() => setActive(city)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(city)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(city)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
        {active && (
          <div
            className={`visited-city-tooltip${active.location.lat > 27 ? " is-below" : ""}`}
            id="visited-city-tooltip"
            role="tooltip"
            style={{
              ...position(active),
              left: `${Math.max(15, Math.min(85, (active.location.lng + 180) / 3.6))}%`,
            }}
          >
            <strong>{active.name}</strong>
            <span>{visitDate(active)}</span>
          </div>
        )}
      </div>
      {!cities.length && <p className="visited-map-hint">No visits added yet.</p>}
      <small className="map-credit">
        Map data:{" "}
        <a
          href="https://www.naturalearthdata.com/about/terms-of-use/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Natural Earth
        </a>
      </small>
    </section>
  );
}
