import React from "react";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";
import Courses from "../sections/Courses";
import Interests from "../sections/Interests";

import Particles from "react-particles-js";
import NavBar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

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
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  handleScroll = () => {
    var $ = document.getElementById;
    const width = window.innerWidth;
    
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

    if (width > 900) {
      var pos2 = window.scrollY + 15;

      // Link Highlighting
      if (pos2 > document.getElementById('Home').offsetTop) {
        helper(1);
      }
      if (pos2 > document.getElementById('AboutMe').offsetTop) {
        helper(2);
      }
      if (pos2 > document.getElementById('Experiences').offsetTop) {
        helper(3);
      }
      if (pos2 > document.getElementById('Projects').offsetTop) {
        helper(4);
      }
      if (pos2 > document.getElementById('Courses').offsetTop) {
        helper(5);
      }
      if (pos2 > document.getElementById('Interests').offsetTop) {
        helper(6);
      }
  }
  };

  render() {
    return (
      <main className="main">
        <div className="animation" style={{ position: "absolute" }}>
          <Particles
            className="animation"
            params={{
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 1500,
                  }
                },
                  "color": {
                      "value": "#63A9AE"
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
                  value: 3,
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
                    mode: "bubble",
                  },
                  onhover:{
                    enable:true,
                    mode: "repulse"
                  }
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

          <header className="main__header" id="Home">
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
                  data-type='[ "Leader.", "Tech Lover.", "Learner." , "Developer."]'
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
                <GitHubIcon 
                  className="main__header__logos__logo"
                  style={{height:'3.5vw',
                  width:'3.5vw', margin: 'auto 0.5rem'}}/>
              </a>
              <a
                href="https://linkedin.com/in/rexliu3"
                className="main__header__logos__link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <LinkedInIcon 
                  className="main__header__logos__logo"
                  s style={{height:'4vw',
                  width:'4vw', margin: 'auto 0.5rem'}}/>
              </a>
              <a
                href="mailto: rexliu3@berkeley.edu"
                className="main__header__logos__link"
                rel="noopener noreferrer"
              >
                <EmailIcon 
                  className="main__header__logos__logo"
                  style={{height:'4vw',
                  width:'4vw', margin: 'auto 0.5rem'}}/>
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

        <div class="main__Courses" id="Courses">
          <Courses />
        </div>

        <div class="main__Interests" id="Interests">
          <Interests />
        </div>
      <Footer />
      </main>
    );
  }
}

export default MainPage;
