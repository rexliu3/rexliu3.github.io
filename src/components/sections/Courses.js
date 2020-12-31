import React from "react";
import Section from "../layouts/Section";

/*
[0] : Title (ex. Computer Science)
[1] : Courses
        [
            ['CS 61A', 'the structure and interpretation of computer programs', 'A+']
            ['EECS 61A', 'the structure and interpretation of computer programs', 'A+']
            
        ]
 */

const Courses = () => {
  return (
    <div className="courses">
      <h1 className="courses__header">UC Berkeley Courses</h1>
      <h2 className="courses__subheader">B.A. Computer Science 2024</h2>
      <hr className="courses__horizontal" />
      <div className="courses__content">
        <Section
          data={[
            "Computer Science",
            [
              [
                "CS 61A",
                "The Structure and Interpretation of Computer Programs",
                "A+",
              ],
              ["CS 61B (current)", "Data Structures", ""],
            ],
          ]}
        />
        <Section
          data={[
            "Business Administration",
            [["UGBA 10", "Principles of Business", "A-"]],
          ]}
        />
        <Section
          data={[
            "Electrical Engineering & Computer Science",
            [
              ["EECS 16A", "Designing Information Devices and Systems I", "A-"],
              [
                "EECS 16B (current)",
                "Designing Information Devices and Systems II",
                "",
              ],
            ],
          ]}
        />
        <Section
          data={[
            "Math",
            [
              ["Math 53", "Multivariable Calculus", "A-"],
              [
                "Math 54 (current)",
                "Linear Algebra and Differential Equations",
                "",
              ],
            ],
          ]}
        />
        <Section
          data={[
            "Data Science",
            [["Data C8 (current)", "Foundations of Data Science", ""]],
          ]}
        />
      </div>
    </div>
  );
};

export default Courses;
