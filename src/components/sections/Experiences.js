import React from "react";
import Experience from "../layouts/Experience";
import useCollection from "../../hooks/useCollection";

const currentExperience = {
  id: "palantir-technologies",
  company: "Palantir Technologies",
  title: "Current role",
  date: "New York · Present",
  website: "https://www.linkedin.com/company/palantir-technologies",
};

const Experiences = () => {
  const { items, loading, error } = useCollection("Experiences");
  return (
    <div>
      <div className="section-heading section-heading--split">
        <div><p className="section-kicker">02 · Experience</p><h2>Building with<br />purposeful teams.</h2></div>
        <p>Roles where I learned, led, and shipped products with real-world impact.</p>
      </div>
      {loading && <p className="collection-status">Loading experience…</p>}
      {error && <p className="collection-status">Experience is unavailable right now.</p>}
      <div className="experience-list">
        {[currentExperience, ...items.filter((item) => item.company !== currentExperience.company)].map((experience) => (
          <Experience key={experience.id} data={experience} />
        ))}
      </div>
    </div>
  );
};

export default Experiences;
