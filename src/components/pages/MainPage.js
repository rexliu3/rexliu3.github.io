import React from "react";
import AboutMe from "../sections/AboutMe";
import Experiences from "../sections/Experiences";
import Projects from "../sections/Projects";


class MainPage extends React.Component {
  render() {
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
        
        <div id="AboutMe">
          <AboutMe />
        </div>

        <div id="Experiences">
          <Experiences />
        </div>

        <div id="Projects">
          <Projects />
        </div>

      </main>
    );
  }
}

export default MainPage;
