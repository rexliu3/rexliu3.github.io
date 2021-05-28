import React, { useState, useEffect } from "react";
import Experience from "../layouts/Experience";

import Bounce from "react-reveal/Bounce";

import db from "./../../firebase.config";

/*const experiencesArr = [
  {
    company: "Berkeley SkyDeck",
    logo: "assets/skydeck.png",
    title: "Software Developer Intern",
    date: "January 2021 - April 2021",
    website: "https://skydeck.berkeley.edu",
    description: [
      "Reduced spam registration for company portal with 2000+ members by improving secure reCAPTCHA V2 system",
      "Managed startup registration pages with 4000+ views per month to secure 30 startups in new cohort",
    ],
  },
  {
    company: "HKP Solutions",
    logo: "assets/hkpsolutions.png",
    title: "Software Developer Tech Lead",
    date: "June 2020 - April 2021",
    website: "https://hkpsolutions.com",
    description: [
      "Lead 10 developers in creating hotel management Android mobile and React web applications aimed at reducing costs",
      "Developed 80 screens in Java and JavaScript, integrated 230 pull requests, and handled 75 issues/enhancements",
      "Run effective scrum meetings with 30 interns to efficiently update backlog and create quality products",
      "Work with CEO and CTO to define project scope, objectives, and development roadmap",
    ],
  },
  {
    company: "Investocracy",
    logo: "assets/investocracy.png",
    title: "Full Stack Software Developer Intern",
    date: "June 2020 - October 2020",
    website: "https://investocracy.co",
    description: [
      "1 of 3 developers creating 3 websites at startup connecting investors and startups across Asia and Africa",
      "Developed dynamic and responsive React frontend with 75 reusable components and 15 pages in JavaScript",
      "Implemented secure user authentication with Node.js, Redux, MongoDB, and Firebase Authentication",
      "Designed and built script to generate and deploy 10K+ SEO-friendly startup webpages with Gatsby",
      "Improved Lighthouse score of websites to 90 by implementing sitemaps, allowing Google to effectively crawl sites",
    ],
  },
  {
    company: "RISE",
    logo: "assets/RISE.png",
    title: "Software Engineering Manager",
    date: "June 2020 - September 2020",
    website: "https://risesummer2020.org",
    description: [
      "Led team of 5 developers in creating job tracking and finding platform and community",
      "Created dynamic React frontend and implemented secure Firebase Authentication and MySQL Database",
      "Allocated work, provided guidance, and resolved issues to meet performance objectives",
    ],
  },
];*/

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    db.collection("Experiences")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setExperiences(oldArray => [...oldArray, doc.data()]);
        });
      });
  }, []);

  return (
    <div className="experiences">
      <Bounce top duration={2000}>
        <h1 className="experiences__header">Experiences</h1>
        <hr className="experiences__horizontal" />
      </Bounce>

      <div className="experiences__content">
        {experiences &&
          experiences.map((experience) => (
            <Bounce right duation={3000} delay={1000}>
              <Experience data={experience} />
            </Bounce>
          ))}
      </div>
    </div>
  );
};

export default Experiences;
