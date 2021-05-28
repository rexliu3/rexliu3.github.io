import React, { useState, useEffect } from "react";
import Extracurricular from "../layouts/Extracurricular";

import Bounce from 'react-reveal/Bounce';

import db from "./../../firebase.config";

const extracurricularsArr = [
  {
    company: "Web Development at Berkeley",
    logo: "assets/wdb.jpeg",
    title: "Software Developer",
    date: "January 2021 - May 2021",
    website: "https://webatberkeley.org/",
    description: [
      "Developed PDF management system for U-Do-It-Legal startup with PDFTron and XSDF to store multi-field PDFs",
      "Created Express.js backend server with Firebase Authentication and MongoDB implementations",
    ],
  },
  {
    company: "Data Science Society at Berkeley",
    logo: "assets/dss.png",
    title: "Data Scientist",
    date: "Sept 2020 - Nov 2020",
    website: "https://dss.berkeley.edu/",
    description: [
      "Developed accurate stock prediction models with TensorFlow ML based on Yahoo Finance API data",
      "Implemented Long Short-Term Memory (LSTM) Networks and 5 LSTM layers for increased accuracy",
      "Visualized and compared models with Matplotlib library to display descriptive graphs",
    ],
  },
  {
    company: "Engineering Student Council (UC Berkeley)",
    logo: "assets/esc.png",
    title: "External VP’s Committee",
    date: "June 2020 - December 2020",
    website: "https://esc.berkeley.edu/",
    description: [
      "Automated club affiliation processes, an initiative that encourages inclusion and connection in STEM clubs through funding",
      "Facilitate connection and inclusion within Berkeley Engineering faculty by hosting events, funding clubs, and creating initiatives",
      "Find sponsors and form corporate connections",
    ],
  },
  {
    company: "Semiahmoo Programming Club",
    logo: "assets/semiprogramming.jpeg",
    title: "Co-Founder and President",
    date: "November 2018 - March 2020",
    website: "https://www.linkedin.com/company/semiahmoo-programming-club",
    description: [
      "Instructed 15 high school students Java and Python by using interactive challenges and projects",
      "Led a team of 5 executives in creating and teaching lesson plans weekly",
      "Coordinated meetings and events with sponsor teachers and principal",
      "Hosted programming competition",
    ],
  },
  {
    company: "Youth Effective Speaking Initiative",
    logo: "assets/ssyes.jpeg",
    title: "VP of Tech and Finance",
    date: "September 2017 - March 2020",
    website: "http://www.ssyesbc.com/",
    description: [
      "Established community of over 170 debaters on social media",
      "Prepared classes for 30+ students weekly",
      "Created and managed website to highlight past achievements and future goals and for announcements",
    ],
  },
  {
    company: "Youth STEM Academy",
    logo: "assets/ysa.jpeg",
    title: "Technical Teaching Assistant",
    date: "March 2017 - August 2019",
    website: "http://www.ysacamp.com/index.php?l=en",
    description: [
      "Work in collaboration with teachers to plan lessons and teach with videos, activities, and challenges",
      "Over 80% of my 40+ students have earned 5s on their AP Computer Science Exams",
    ],
  },
  {
    company: "Semiahmoo STEM Outreach Program",
    logo: "assets/stemoutreach.jpeg",
    title: "Coordinator",
    date: "February 2019 - March 2020",
    website: "https://www.linkedin.com/company/semiahmoo-stem-outreach-program",
    description: [
      "Headed instruction of 20 elementary school students for mBots and Scratch, basic robotics and programming",
      "Managed 7 mentors in developing weekly lessons and teaching classes",
    ],
  },
];

const Extracurriculars = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);

  useEffect(() => {
    db.collection("Extracurriculars")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setExtracurriculars(oldArray => [...oldArray, doc.data()]);
          console.log(doc.data());
        });
      });
  }, []);

  return (
    <div className="extracurriculars">
      <Bounce top duration={2000}>
        <h1 className="extracurriculars__header">Extracurriculars</h1>
        <hr className="extracurriculars__horizontal" />
      </Bounce>
      <div className="extracurriculars__content">
        {extracurriculars.map(extracurricular =>
        <Bounce right duration={3000} delay={1000}>
          <Extracurricular data={extracurricular}/>
        </Bounce>
          )}
      </div>
    </div>
  );
};

export default Extracurriculars;
