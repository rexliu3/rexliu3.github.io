import React from "react";

const AboutMe = () => {
  return (
    <div className="aboutme">
      <h1 className="aboutme__header">About Me</h1>
      <h2 className="aboutme__about">Learn More About Me!</h2>
      <div className="aboutme__content">
        <div className="aboutme__content__education">
          <h2 className="aboutme__content__education__title">Education</h2>
        </div>
        <div className="aboutme__content__central">
          <div className="aboutme__content__central__experiences">
            <h2 className="aboutme__content__central__experiences__title">
              Experiences
            </h2>
          </div>
          <div className="aboutme__content__central__projects">
            <h2 className="aboutme__content__central__projects__title">
              Projects
            </h2>
          </div>
        </div>
        <div className="aboutme__content__resume">
          <h2 className="aboutme__content__resume__title">Resume</h2>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
