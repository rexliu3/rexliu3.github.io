import React from "react";
import Project from "../layouts/Project";
import useCollection from "../../hooks/useCollection";

const Projects = () => {
  const { items, loading, error } = useCollection("Projects");
  return (
    <div>
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">03 · Selected work</p>
          <h2>
            Ideas brought
            <br />
            into the world.
          </h2>
        </div>
        <p>A selection of software, experiments, and products I’ve helped build.</p>
      </div>
      {loading && <p className="collection-status">Loading projects…</p>}
      {error && <p className="collection-status">Projects are unavailable right now.</p>}
      <div className="project-grid">
        {items.map((project, index) => (
          <Project key={project._id} data={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
