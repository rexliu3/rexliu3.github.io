import React from "react";
import VisitedCitiesMap from "./VisitedCitiesMap";

const monthYear = (city) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(city.year, city.month - 1, 1))
  );

export default function TravelPanel({ room, cities, visitedCities = [] }) {
  return (
    <>
      <p className="panel-lede">{room.lede}</p>
      {!!cities.length && (
        <ol className="city-journey" aria-label="My journey across three cities">
          {cities.map((city, index) => {
            const visit = visitedCities.find((item) => item.name.split(",")[0] === city.name);
            return (
              <li key={city._id || city.name}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <strong>{city.name}</strong>
                  <p>{city.subtitle || city.text}</p>
                  {visit && <time>{monthYear(visit)}</time>}
                </div>
              </li>
            );
          })}
        </ol>
      )}
      <VisitedCitiesMap cities={visitedCities} />
    </>
  );
}
