import React from "react";
import Section from "../layouts/Section";

const courses = [
  {
    title: "Computer Science",
    courses: [
      ["CS 61A", "The Structure and Interpretation of Computer Programs", "A+"],
      ["CS 61B (current)", "Data Structures", ""],
    ],
  },
  {
    title: "Business Administration/Economics",
    courses: [["UGBA 10", "Principles of Business", "A-"],
              ["Econ 1 (current)", "Introduction to Economics", ""]
  
  ],
  },
  {
    title: "Electrical Engineering & Computer Science",
    courses: [
      ["EECS 16A", "Designing Information Devices and Systems I", "A-"],
      [
        "EECS 16B (current)",
        "Designing Information Devices and Systems II",
        "",
      ],
    ],
  },
  {
    title: "Math",
    courses: [
      ["Math 53", "Multivariable Calculus", "A-"],
      ["Math 54 (current)", "Linear Algebra and Differential Equations", ""],
    ],
  },
  {
    title: "Data Science",
    courses: [["Data C8 (current)", "Foundations of Data Science", ""]],
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
