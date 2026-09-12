import React from "react";
import Extracurricular from "../layouts/Extracurricular";
import useCollection from "../../hooks/useCollection";

const Extracurriculars = () => {
  const { items, loading, error } = useCollection("Extracurriculars");
  return (
    <div>
      <div className="section-heading"><p className="section-kicker">04 · Beyond work</p><h2>Communities that<br />shaped my perspective.</h2></div>
      {loading && <p className="collection-status">Loading community work…</p>}
      {error && <p className="collection-status">Community work is unavailable right now.</p>}
      <div className="community-grid">{items.map((item) => <Extracurricular key={item.id} data={item} />)}</div>
    </div>
  );
};

export default Extracurriculars;
