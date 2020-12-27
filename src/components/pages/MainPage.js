import React from "react";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";
//import { particlesJS } from particles.js;
import Particles from "react-particles-js";
import NavBar from "../layouts/Navbar";

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
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.scrollTo(0,0);
    document.querySelector(".navigation__link.firstNav").className = "navigation__link firstNav"
    document.querySelector(".navigation__link.secondNav").className = "navigation__link secondNav"
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  handleScroll = () => {
    var helper = function(num) {
        let i = 1
        let dictions = {1: 'firstNav', 2: 'secondNav', 3: 'thirdNav', 4: 'fourthNav', 5: 'fifthNav', 6: 'sixthNav'}
        while (i <= 6) {
            let oldNameSelector = ".navigation__link." + dictions[i]
            let newName = "navigation__link " + dictions[i]
            if (i == num) {
              newName += ' scrolled'
            }
            document.querySelector(oldNameSelector).className = newName
            i += 1
        }

    }

    if (window.scrollY < 2000) {
      helper(2)
    }

    if (window.scrollY < 3000 && window.scrollY > 2000 ) {
      helper(3)
    }

    if (window.scrollY < 4000 && window.scrollY > 3000 ) {
      helper(4)
    }

    if (window.scrollY < 5000 && window.scrollY > 4000 ) {
      helper(5)
    }

    if (window.scrollY < 6000 && window.scrollY > 5000 ) {
      helper(6)
    }

  };

  render() {
    const togglePopup = () => {
      document.getElementById("popup").classList.toggle("active");
      document.getElementById("blur").classList.toggle("active");
    };

    return (
      <main className="main">
        <div className="animation" style={{ position: "absolute" }}>
          <Particles
            className="animation"
            params={{
              particles: {
                number: {
                  value: 60,
                  density: {
                    enable: true,
                    value_area: 1500,
                  },
                },
                line_linked: {
                  enable: true,
                  opacity: 0.5,
                },
                move: {
                  direction: "center",
                  speed: 5,
                },
                size: {
                  value: 2,
                },
                opacity: {
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.5,
                  },
                },
              },
              interactivity: {
                events: {
                  onclick: {
                    enable: true,
                    mode: "push",
                  },
                },
                modes: {
                  push: {
                    particles_nb: 1,
                  },
                },
              },
              retina_detect: true,
            }}
          />

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
                  data-type='[ "Leader.", "Tech.", "Learner." , "Web Developer"]'
                >
                  <span class="wrap"></span>
                </div>
              </h2>
            </div>
            <div className="main__header__logos">
              <a
                href="https://github.com/rexliu3"
                className="main__header__logos__link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img
                  className="main__header__logos__logo"
                  src="assets/GitHub-Logo.png"
                ></img>
              </a>
              <a
                href="https://linkedin.com/in/rexliu3"
                className="main__header__logos__link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img
                  className="main__header__logos__logo"
                  src="assets/linkedin.png"
                ></img>
              </a>
              <a
                href="mailto: rexliu3@berkeley.edu"
                className="main__header__logos__link"
                rel="noopener noreferrer"
              >
                <img
                  className="main__header__logos__logo"
                  src="assets/email3.png"
                ></img>
              </a>
            </div>

            <a href="#AboutMe">
              <div class="main__header__arrow bounce"></div>
            </a>
          </header>
        </div>
        <NavBar />
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
