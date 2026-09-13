import React from "react";
import Section from "../layouts/Section";
import useCollection from "../../hooks/useCollection";

const Courses = () => {
  const { items, loading, error } = useCollection("Courses");
  const courses = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <div>
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">05 · Education</p>
          <h2>
            Foundations for
            <br />
            lifelong learning.
          </h2>
        </div>
        <p>UC Berkeley · B.A. Computer Science · 2020–2023</p>
      </div>
      {loading && <p className="collection-status">Loading coursework…</p>}
      {error && <p className="collection-status">Coursework is unavailable right now.</p>}
      <div className="course-grid">
        {courses.map((course) => (
          <Section key={course._id} data={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
