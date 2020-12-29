import React from "react";
import Hexagon from "react-hexagon";
import Icon from "../layouts/Icon";
import Button from '@material-ui/core/Button';



const AboutMe = () => {
  
  const togglePopup = () => {
    document.getElementById("popup").classList.toggle("active");
    document.getElementById("blur").classList.toggle("active");
  }

  window.onclick = function(event) {
    var popup = document.getElementById("popup");
    if (event.target == popup && popup.style.display == "block") {
      document.getElementById("popup").classList.toggle("active");
    }
  }

  return (
    <div className="aboutme">
      <h1 className="aboutme__header" data-animation="slide-in-left" data-delay=".5s">About</h1>
      <hr className="aboutme__horizontal"></hr>
      <div className="aboutme__content">
          <div className="aboutme__content__icons">
            <Icon data={["assets/lead1.png", "Leader", "sjtjalj lajgljaljgalhahahdfhsd ghdhwshrhrwth"]}/>
            <Icon data={["assets/linkedin.png", "Tech", "sjtjalj lajgljaljgalhahahdfhsd ghdhwshrhrwth"]}/>
            <Icon data={["assets/linkedin.png", "Learner", "sjtjalj lajgljaljgalhahahdfhsd ghdhwshrhrwth"]}/>
            <Icon data={["assets/linkedin.png", "Web Developer", "sjtjalj lajgljaljgalhahahdfhsd ghdhwshrhrwth"]}/>
        </div>
        <div className="aboutme__content__description">
          <Hexagon 
            className="aboutme__content__description__image"
            style={{strokeWidth: '10', stroke:'#63A9AE'}}
            backgroundImage="assets/Profile-Picture.jpg"
            flatTop='True'
            backgroundScale='1'
          />
          <div className="aboutme__content__description__text">
            <h3 className="aboutme__content__description__text__title">
              Rex Liu
            </h3>
            <p className="aboutme__content__description__text__text">Hello! I’m Rex, a Computer Science Student at UC Berkeley. I'm excited to learn new things, challenge myself, and use technology to make an impact. My interests are very diverse and I love learning more about different technologies and tools. After picking up web development over the summer and interning at several global startups as a web developer including RISE and Investocracy, I began learning Tensorflow and exploring the Alpaca Trading API to develop a Stock Trading Bot as a personal project. I expanded on this idea as a Data Scientist at the Data Science Society at Berkeley this past semester where I worked to develop a more robust stock analyzing model.</p>
            <p>&nbsp;</p>
            <p className="aboutme__content__description__text__text">So where am I today?</p>
            <p className="aboutme__content__description__text__text">With extensive experience leading tech teams of 10+ interns and developing several web and mobile applications, I’ve become proficient developing and managing both the frontend and backend of mobile and web applications with tools such as React, HTML, CSS, Redux, SQL and more. I have strong leadership and collaboration skills in a software development environment and am looking to work on revolutionary products.</p>
            <p>&nbsp;</p>
            <p className="aboutme__content__description__text__text">If I’m not building a project behind the screen, you could find me learning the latest Chess strategies, practicing my Tennis skills, or competing in badminton tournaments. </p>
            <p className="aboutme__content__description__text__text">If you’d like to witness my abilities firsthand, please feel free to reach out to me for Summer 2021 opportunities! </p>

            <a className="aboutme__content__description__text__link" href="assets/Resume_Rex.pdf" download>
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
