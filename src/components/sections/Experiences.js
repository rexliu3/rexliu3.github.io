import React from "react";
import Experience from "../layouts/Experience";

/*
[0] : Company
[1] : Logo Location
[2] : Position Name
[3] : Date
[4] : Website Link
[5] : Description (list)
 */

const experiences = [
  {
    company: "HKP Solutions",
    logo: "assets/hkpsolutions.png",
    title: "Software Developer Tech Lead",
    date: "June 2020 - Present",
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
    title: "Full Stack Web Developer Intern",
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
  {
    company: "Ortexo",
    logo: "assets/Ortexo.jpeg",
    title: "Quality Assurance Tester",
    date: "June 2020 - August 2020",
    website: "https://ortexo.com",
    description: [
      "Conducted extensive unit and integrated tests to find and track bugs on all company code",
      " Noted bugs, suggested improvements, and properly documented 20+ GitHub issues",
      "Create detailed project idea templates on W3Hacks.com",
    ],
  },
];

const Experiences = () => {
  return (
    <div className="experiences">
      <h1 className="experiences__header">Experiences</h1>
      <hr className="experiences__horizontal" />
      <div className="experiences__content">
        {experiences.map(experience =>
          <Experience data={[experience.company, experience.logo, experience.title, experience.date, experience.website, experience.description]}/>
          )}

       
      </div>
    </div>
  );
};

export default Experiences;
