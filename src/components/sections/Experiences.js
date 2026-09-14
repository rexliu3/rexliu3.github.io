import React from "react";
import Experience from "../layouts/Experience";
import useCollection from "../../hooks/useCollection";

const Experiences = () => {
  const { items, loading, error } = useCollection("experiences");
  return (
    <div>
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">02 · Experience</p>
          <h2>
            Building with
            <br />
            purposeful teams.
          </h2>
        </div>
        <p>Roles where I learned, led, and shipped products with real-world impact.</p>
      </div>
      {loading && <p className="collection-status">Loading experience…</p>}
      {error && <p className="collection-status">Experience is unavailable right now.</p>}
      <div className="experience-list">
        {items.map((experience) => (
          <Experience key={experience._id} data={experience} />
        ))}
      </div>
    </div>
  );
};

export default Experiences;
