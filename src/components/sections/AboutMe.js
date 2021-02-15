import React from "react";
import Hexagon from "react-hexagon";
import Icon from "../layouts/Icon";

const descriptors = [
  { name: "Leader", logo: "assets/leader.svg", description: null },
  { name: "Tech Lover", logo: "assets/tech.png", description: null },
  { name: "Learner", logo: "assets/learner.png", description: null },
  { name: "Developer", logo: "assets/web.png", description: null },
];

const content = {
  name: "Rex Liu",
  description1: `Hello! I’m Rex, a Computer Science Student at UC Berkeley. I'm
  excited to learn new things, challenge myself, and use technology
  to make an impact. My interests are very diverse and I love
  learning more about different technologies and tools. After
  picking up web development over the summer and interning at
  several global startups as a web developer including RISE and
  Investocracy, I began learning Tensorflow and exploring the Alpaca
  Trading API to develop a Stock Trading Bot as a personal project.
  I expanded on this idea as a Data Scientist at the Data Science
  Society at Berkeley this past semester where I worked to develop a
  more robust stock analyzing model.`,
  description2: "So where am I today?",
  description3: `With extensive experience leading tech teams of 10+ interns and
  developing several web and mobile applications, I’ve become
  proficient developing and managing both the frontend and backend
  of mobile and web applications with tools such as React, HTML,
  CSS, Redux, SQL and more. I have strong leadership and
  collaboration skills in a software development environment and am
  looking to work on revolutionary products.`,
  description4: `If I’m not building a project behind the screen, you could find me
  learning the latest Chess strategies, practicing my Tennis skills,
  or competing in badminton tournaments.`,
  description5: `If you’d like to witness my abilities firsthand, please feel free
  to reach out to me for Summer 2021 opportunities!`,
};

const AboutMe = () => {
  return (
    <div className="aboutme">
      <h1 className="aboutme__header">About</h1>
      <hr className="aboutme__horizontal"></hr>
      <div className="aboutme__content">
        <div className="aboutme__content__icons">
          {descriptors.map((descriptor) => (
            <Icon data={descriptor} />
          ))}
        </div>
        <div className="aboutme__content__description">
          <Hexagon
            className="aboutme__content__description__image"
            style={{ strokeWidth: "10", stroke: "#63A9AE" }}
            backgroundImage="assets/Profile-Picture.png"
            flatTop="True"
          />
          <div className="aboutme__content__description__text">
            <h3 className="aboutme__content__description__text__title">
              {content.name}
            </h3>
            <p className="aboutme__content__description__text__text">
              {content.description1}
            </p>
            <p>&nbsp;</p>
            <p className="aboutme__content__description__text__text">
              {content.description2}
            </p>
            <p className="aboutme__content__description__text__text">
              {content.description3}
            </p>
            <p>&nbsp;</p>
            <p className="aboutme__content__description__text__text">
              {content.description4}
            </p>
            <p className="aboutme__content__description__text__text">
              {content.description5}
            </p>
            
            <a className="aboutme__content__description__text__link" href="/Resume_RexLiu.pdf" target="__blank">
              <button className="aboutme__content__description__text__button">
                Resume
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
