import React from "react";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.setAttribute("className", "main__header__about");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #ffffff}";
  document.body.appendChild(css);
};

class MainPage extends React.Component {
  render() {
    const togglePopup = () => {
      document.getElementById("popup").classList.toggle("active");
      document.getElementById("blur").classList.toggle("active");
    };

    return (
      <main className="main">
        <header className="main__header">
          <h1 className="main__header__name">Rex Liu</h1>
          <hr className="main__header__horizontal"></hr>
          <div className="main__header__aboutOuter">
            <h2 className="main__header__about">Hi, I am a&nbsp;</h2>
            <h2 className="main__header__about">
              <div
                href=""
                class="typewrite"
                data-period="2000"
                data-type='[ "Leader.", "Tech Enthusiast.", "Learner." , "Web Developer"]'
              >
                <span class="wrap"></span>
              </div>
            </h2>
          </div>
          <div className="main__header__logos">
            <a href="https://github.com/rexliu3">
              <img
                className="main__header__logos__logo"
                src="assets/GitHub-Logo.png"
              ></img>
            </a>
            <a href="https://linkedin.com/in/rexliu3">
              <img
                className="main__header__logos__logo"
                src="assets/linkedin.png"
              ></img>
            </a>
            <a href="mailto: rexliu3@berkeley.edu">
              <img
                className="main__header__logos__logo"
                src="assets/email3.png"
              ></img>
            </a>
          </div>

          <a href="#">
            <div class="main__header__arrow bounce"></div>
          </a>
        </header>

        <div class="main__AboutMe" id="AboutMe">
          <AboutMe />
        </div>

        <div class="main__Experiences" id="Experiences">
          <Experiences />
        </div>

        <div class="main__Projects" id="Projects">
          <Projects />
        </div>

        <footer className="main__footer">
          <div id="newline">
            {/*} className="divider" id="footerOne" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L50 100 L100 0 Z"></path>
          </svg>*/}
            <div className="divider" id="footerOne" />
            <ul className="main__footer__navitems">
              <li className="main__footer__item">
                <a
                  className="main__footer__link"
                  href="https://linkedin.com/in/rexliu3"
                  target="_blank"
                >
                  <img
                    className="main__footer__logo"
                    src="assets/linkedin.png"
                  ></img>
                </a>
              </li>
              <li className="main__footer__item">
                <a
                  className="main__footer__link"
                  href="https://github.com/rexliu3"
                  target="_blank"
                >
                  <img
                    className="main__footer__logo"
                    src="assets/github.png"
                  ></img>
                </a>
              </li>
              <li className="main__footer__item">
                <a
                  className="main__footer__link"
                  href="https://instagram.com/rexliu3"
                  target="_blank"
                >
                  <img
                    className="main__footer__logo"
                    src="assets/instagram.png"
                  ></img>
                </a>
              </li>
              <li className="main__footer__item">
                <a
                  className="main__footer__link"
                  href="https://facebook.com/rexliu333"
                  target="_blank"
                >
                  <img
                    className="main__footer__logo"
                    src="assets/facebook.png"
                  ></img>
                </a>
              </li>
            </ul>

            <ul className="main__footer__nav">
              <li className="main__footer__item">
                <a className="main__footer__link" href="#AboutMe">
                  About
                </a>
              </li>
              <li className="main__footer__item">
                <a className="main__footer__link" href="#Experiences">
                  Experiences
                </a>
              </li>
              <li className="main__footer__item">
                <a className="main__footer__link" href="#Projects">
                  Projects
                </a>
              </li>
              <li className="main__footer__item">
                <a className="main__footer__link" href="/">
                  Skills
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </main>
    );
  }
}

export default MainPage;
