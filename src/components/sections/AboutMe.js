import React from "react";

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
      <div className="popup" id="popup">
        <div className="overlay"></div>
        <div className="content">
          <div className="close-btn" onClick=
          {() => {
            togglePopup();
          }}>&times;</div>
          <h2 className="header">Education</h2>
          <img className="logo" src="assets/Berkeley-Seal.png"></img>
          <br></br>
          <p className="bodycolor">University:&nbsp;</p>
          <p className="body">University of California, Berkeley</p>
          <br></br>
          <p className="bodycolor">Major:&nbsp;</p>
          <p className="body">Computer Science</p>
          <br></br>
          <p className="bodycolor">Graduation Year:&nbsp;</p>
          <p className="body">2024</p>
          <br></br>
          <p className="bodycolor">GPA:&nbsp;</p>
          <p className="body">N/A</p>
        </div>
      </div>

      <h1 className="aboutme__header">About Me</h1>
      <h2 className="aboutme__about">Learn More About Me!</h2>
      <div className="aboutme__content">
        <div className="aboutme__content__education">
          <h2 className="aboutme__content__education__title">Education</h2>
          <a onClick=
          {() => {
            togglePopup();
          }}>
            <div className="aboutme__content__education__content" id="blur">
              <img src="assets/Education.png"></img>
            </div>
          </a>
        </div>
        <div className="aboutme__content__central">
          <div className="aboutme__content__central__experiences">
            <h2 className="aboutme__content__central__experiences__title">
              Experiences
            </h2>
            <a href="#Experiences">
              <div className="aboutme__content__central__experiences__content">
                <img src="assets/Experiences.png"></img>
              </div>
            </a>
          </div>
          <div className="aboutme__content__central__projects">
            <h2 className="aboutme__content__central__projects__title">
              Projects
            </h2>
            <a href="#Projects">
              <div className="aboutme__content__central__projects__content">
                <img src="assets/Projects.png"></img>
              </div>
            </a>
          </div>
        </div>
        <div className="aboutme__content__resume">
          <h2 className="aboutme__content__resume__title">Resume</h2>
          {/*<---------TODO Update Resume--------->*/}
          <a href="assets/Resume_RexLiu.pdf" download>
          <div className="aboutme__content__resume__content">
              <img src="assets/Resume.png"></img>
          </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
