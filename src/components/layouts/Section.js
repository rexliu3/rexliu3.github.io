import React from "react";

const Section = (props) => {
  const { data } = props;

/*
[0] : Title (ex. Computer Science)
[1] : Courses
        [
            ['CS 61A', 'the structure and interpretation of computer programs', 'A+']

        ]
 */

  return (
    <section className="section">
        <div className="section__content">
            <div className="section__content__header">
                {data[0]}
            </div>
            <div className="section__content__courses">
                <ul className="section__content__courses__list">{data[1].map(course => <li className="section__content__courses__item" key={course}><strong>{course[0]}</strong> {': ' + course[1] + ' (' + course[2] + ')'} </li>)}</ul>
            </div>
        </div>
    </section>
  );
};

export default Section;
