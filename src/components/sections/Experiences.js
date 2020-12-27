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

const Experiences = () => {
  return (
    <div className="experiences">
        <h1 className="experiences__header">Experiences</h1>
        <hr className="experiences__horizontal" />
        <div className="experiences__content">
            <Experience data={["HKP Solutions", "assets/hkpsolutions.png", "Software Developer Tech Lead", "June 2020 - Present", "https://hkpsolutions.com", ['Lead 10 developers in creating hotel management Android mobile and React web applications aimed at reducing costs', 'Developed 80 screens in Java and JavaScript, integrated 230 pull requests, and handled 75 issues/enhancements', 'Run effective scrum meetings with 30 interns to efficiently update backlog and create quality products', 'Work with CEO and CTO to define project scope, objectives, and development roadmap', '']]}/>
            <Experience data={["Investocracy", "assets/investocracy.png", "Full Stack Web Developer Intern", "June 2020 - Present", "https://investocracy.co", ['1 of 3 developers creating 3 websites at startup connecting investors and startups across Asia and Africa', 'Developed dynamic and responsive React frontend with 75 reusable components and 15 pages in JavaScript', 'Implemented secure user authentication with Node.js, Redux, MongoDB, and Firebase Authentication', 'Designed and built script to generate and deploy 10K+ SEO-friendly startup webpages with Gatsby', 'Improved Lighthouse score of websites to 90 by implementing sitemaps, allowing Google to effectively crawl sites']]}/>
            <Experience data={["RISE", "assets/RISE.png", "Software Engineering Manager", "June 2020 - Sept 2020", "https://risesummer2020.org", ['Led team of 5 developers in creating job tracking and finding platform and community', 'Created dynamic React frontend and implemented secure Firebase Authentication and MySQL Database', 'Allocated work, provided guidance, and resolved issues to meet performance objectives', '', '']]}/>
            <Experience data={["Ortexo", "assets/Ortexo.jpeg", "Quality Assurance Tester", "June 2020 - Aug 2020", "https://ortexo.com", ['Conducted extensive unit and integrated tests to find and track bugs on all company code', ' Noted bugs, suggested improvements, and properly documented 20+ GitHub issues', 'Create detailed project idea templates on W3Hacks.com', '', '']]}/>

          </div>

      </div>
  );
};

export default Experiences;
