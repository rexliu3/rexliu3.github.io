import React from "react";

const AboutMe = () => {
  // Get the modal
  var modal = document.getElementById("modal__experiences");

  // Get the button that opens the modal
  var opener = document.getElementsByClassName(
    "openExperiences"
  );

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close");

  // When the user clicks on the button, open the modal
  opener.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div className="aboutme">
        <div className="modal__experiences" id="modal__experiences">
          <span className="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
        <h1 className="aboutme__header">About Me</h1>
        <h2 className="aboutme__about">Learn More About Me!</h2>
        <div className="aboutme__content">
          <div className="aboutme__content__education">
            <h2 className="aboutme__content__education__title">Education</h2>
            <div className="aboutme__content__education__content">
              <img src="assets/Education.png"></img>
            </div>
          </div>
          <div className="aboutme__content__central">
            <div className="aboutme__content__central__experiences">
              <h2 className="aboutme__content__central__experiences__title">
                Experiences
              </h2>
              <a className="openExperiences">
              <div
                className="aboutme__content__central__experiences__content"
              >
                <img src="assets/Experiences.png"></img>
              </div>
              </a>
            </div>
            <div className="aboutme__content__central__projects">
              <h2 className="aboutme__content__central__projects__title">
                Projects
              </h2>
              <div className="aboutme__content__central__projects__content">
                <img src="assets/Projects.png"></img>
              </div>
            </div>
          </div>
          <div className="aboutme__content__resume">
            <h2 className="aboutme__content__resume__title">Resume</h2>
            <div className="aboutme__content__resume__content">
              <img src="assets/Resume.png"></img>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutMe;
