import React from "react";
import Card from '@material-ui/core/Card';

const Section = (props) => {
  const { data } = props;
  return (
    <Card className="section">
      <div className="section__content">
        <div className="section__content__header">{data.title}</div>
        <div className="section__content__courses">
          <ul className="section__content__courses__list">
            {data.courses.map((course) => (
              <li className="section__content__courses__item" key={course}>
                <strong style={{color:"#63A9AE"}}>{course.shortName}: </strong> {course.fullName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Section;
