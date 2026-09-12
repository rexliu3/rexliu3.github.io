import React from "react";

const Section = ({ data }) => (
  <article className="course-group">
    <h3>{data.title}</h3>
    <ul>{data.courses.map((course, index) => <li key={`${course.shortName}-${index}`}><span>{course.shortName}</span><p>{course.fullName}</p></li>)}</ul>
  </article>
);

export default Section;
