import React, { useState } from "react";
import CityDrawing from "./CityDrawing";
import VisitedCitiesMap from "./VisitedCitiesMap";

export default function TravelPanel({ room, content, cities, visitedCities = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cityIndex = Math.min(selectedIndex, Math.max(0, cities.length - 1));
  const city = cities[cityIndex];

  function handleTabKey(event, index) {
    const last = cities.length - 1;
    const destinations = {
      Home: 0,
      End: last,
      ArrowRight: (index + 1) % cities.length,
      ArrowLeft: (index + last) % cities.length,
    };
    const nextIndex = destinations[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    setSelectedIndex(nextIndex);
    const nextTab = document.getElementById(`city-tab-${nextIndex}`);
    if (nextTab) nextTab.focus();
  }

  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      {city && (
        <>
          <div className="city-tabs" role="tablist" aria-label={content.tabsLabel}>
            {cities.map((item, index) => (
              <button
                type="button"
                key={item._id || item.name}
                id={`city-tab-${index}`}
                role="tab"
                aria-selected={cityIndex === index}
                aria-controls="city-story"
                tabIndex={cityIndex === index ? 0 : -1}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                {item.name}
                {index < cities.length - 1 && <span aria-hidden="true">→</span>}
              </button>
            ))}
          </div>
          <div
            className="city-story"
            id="city-story"
            role="tabpanel"
            aria-labelledby={`city-tab-${cityIndex}`}
            tabIndex={0}
          >
            <CityDrawing city={city} />
            <p className="eyebrow">{city.label}</p>
            <h3>{city.subtitle}</h3>
            <p>{city.text}</p>
          </div>
        </>
      )}
      <VisitedCitiesMap cities={visitedCities} />
    </>
  );
}
