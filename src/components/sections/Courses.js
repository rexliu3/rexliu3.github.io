import React, { useState, useEffect } from "react";
import Section from "../layouts/Section";

import Bounce from 'react-reveal/Bounce';

import db from "./../../firebase.config";

/* const coursesArr = [
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
      ["INDENG 190E (current)", "Advanced Topics in Industrial Engineering and Operations Research: Entrepreneurship & Innovation", ""],
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
];*/

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    db.collection("Courses")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCourses(oldArray => [...oldArray, doc.data()]);
        });
      });
  }, []);

  return (
    <div className="courses">
      <Bounce top duration={2000}>
        <h1 className="courses__header">UC Berkeley Courses</h1>
        <h2 className="courses__subheader">B.A. Computer Science 2024</h2>
        <hr className="courses__horizontal" />
      </Bounce>
      <div className="courses__content">
        {courses.sort(function compareFn(firstEl, secondEl) { return firstEl.order - secondEl.order}).map(course =>
        <Bounce right duration={3000} delay={1000}>
          <Section data={course}/>
          </Bounce>
          )}
      </div>
    </div>
  );
};

export default Courses;
