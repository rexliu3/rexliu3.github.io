import React from "react";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";


class MainPage extends React.Component {
  render() {
    const togglePopup = () => {
      document.getElementById("popup").classList.toggle("active");
      document.getElementById("blur").classList.toggle("active");
    }    

    return (
      <main className="main">
        <header className="main__header">
        <nav className="main__navigation" id="nav">
          <ul className="main__navigation__nav">
            <li className="main__navigation__item">
              <a className="main__navigation__link" href="#AboutMe">
                About
              </a>
            </li>
            <li className="main__navigation__item">
              <a className="main__navigation__link" href="#Experiences">
                Experiences
              </a>
            </li>
          </ul>
          <a className="main__navigation__logo" href="#">
            <img
              src="assets/Profile-Picture.jpg"
              className="main__navigation__logo__image"
            />
          </a>
          <ul className="main__navigation__nav">
            <li className="main__navigation__item">
              <a className="main__navigation__link" href="#Projects">
                Projects
              </a>
            </li>
            <li className="main__navigation__item">
              <a className="main__navigation__link" href="/">
                Skills
              </a>
            </li>
          </ul>
        </nav>
          <h1 className="main__header__name">Rex Liu</h1>
          <h2 className="main__header__about">
            Software Developer. Data Scientist. <br></br>
            Badminton Player. Pianist.
          </h2>
          <a href="mailto: rexliu3@berkeley.edu">
            <img className="main__header__email" src="assets/email3.png"></img>
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
          <div className="divider" id="footerOne"/>
          <ul className="main__footer__navitems">
              <li className="main__footer__item">
                <a className="main__footer__link" href="https://linkedin.com/in/rexliu3" target="_blank">
                  <img className="main__footer__logo" src="assets/linkedin.png"></img>
                </a>
              </li>
              <li className="main__footer__item">
                <a className="main__footer__link" href="https://instagram.com/rexliu3" target="_blank">
                  <img className="main__footer__logo" src="assets/instagram.png"></img>
                </a>
              </li>
              <li className="main__footer__item">
                <a className="main__footer__link" href="https://facebook.com/rexliu333" target="_blank">
                  <img className="main__footer__logo" src="assets/facebook.png"></img>
                </a>
              </li>
              <li className="main__footer__item">
                <a className="main__footer__link" href="https://open.spotify.com/user/rexliu3" target="_blank">
                  <img className="main__footer__logo" src="assets/spotify.png"></img>
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
