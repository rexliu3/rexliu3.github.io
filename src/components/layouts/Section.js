import React from "react";

const Section = (props) => {
  const { data } = props;
  return (
    <section className="section">
      <div className="section__content">
        <div className="section__content__header">{data.title}</div>
        <div className="section__content__courses">
          <ul className="section__content__courses__list">
            {data.courses.map((course) => (
              <li className="section__content__courses__item" key={course}>
                <strong>{course[0]}</strong>
                {": " + course[1]}
                {course[2] !== "" && " (" + course[2] + ")"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section;
