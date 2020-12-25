import React from "react";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";
//import { particlesJS } from particles.js;
import Particles from 'react-particles-js';

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

//particlesJS("particles-js", {"particles":{"number":{"value":400,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":6,"direction":"bottom","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

class MainPage extends React.Component {
  render() {
    const togglePopup = () => {
      document.getElementById("popup").classList.toggle("active");
      document.getElementById("blur").classList.toggle("active");
    };

    return (
      <main className="main">
        
        <header className="main__header">
        {/*<div id="particles-js"></div>
        <script src="particles.js"></script>
        <div class="count-particles"> <span class="js-count-particles">--</span> particles </div> <script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script><script src="http://threejs.org/examples/js/libs/stats.min.js"></script>
    */}
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
        <div className="animation">
        <Particles />  </div>

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
