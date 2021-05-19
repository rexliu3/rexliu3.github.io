import React from "react";
import Section from "../layouts/Section";

const courses = [
  {
    title: "Computer Science",
    courses: [
      ["CS 61A", "The Structure and Interpretation of Computer Programs", "A+"],
      ["CS 61B", "Data Structures", ""],
      ["CS 70 (current)", "Discrete Mathematics and Probability Theory", ""],
    ],
  },
  {
    title: "Business Administration/Economics",
    courses: [["UGBA 10", "Principles of Business", "A-"],
              ["Econ 1", "Introduction to Economics", ""],
              ["UGBA 88 (current)", "Data and Decisions", ""],
  
  ],
  },
  {
    title: "Engineering",
    courses: [
      ["EECS 16A", "Designing Information Devices and Systems I", "A-"],
      [
        "EECS 16B",
        "Designing Information Devices and Systems II",
        "",
      ],
      ["ENGIN 120 (current)", "Principles of Engineering Economics", ""],
    ],
  },
  {
    title: "Math",
    courses: [
      ["Math 53", "Multivariable Calculus", "A-"],
      ["Math 54", "Linear Algebra and Differential Equations", ""],
    ],
  },
  {
    title: "Data Science",
    courses: [["Data C8", "Foundations of Data Science", ""]],
  },
];

const Courses = () => {
  return (
    <div className="courses">
      <h1 className="courses__header">UC Berkeley Courses</h1>
      <h2 className="courses__subheader">B.A. Computer Science 2024</h2>
      <hr className="courses__horizontal" />
      <div className="courses__content">
        {courses.map(course =>
          <Section data={course}/>
          )}
      </div>
    </div>
  );
};

export default Courses;
