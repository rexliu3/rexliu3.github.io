import React, { Component } from "react";

class Navbar extends Component {
  state = {};

  componentDidMount = () => {};

  // Close the navbar
  closeNavbar = () => {
    document.getElementById("myNav").style.width = "0%";
  };

  // Open the navbar
  openNavbar = () => {
    document.getElementById("myNav").style.width = "100%";
  };

  render() {
    return (
      <div>
        {/* Navigation starts now */}
        <div className="nav" id="nav">
          <a className="nav__logo" href="#">
            Rex Liu
          </a>
          <nav className="navigation" id="myNav">
            <ul className="navigation__nav">
              <li className="navigation__item">
                <a className="navigation__link firstNav" href="#">
                  Home
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link secondNav" href="#AboutMe">
                  About
                </a>
              </li>

              <li className="navigation__item">
                <a className="navigation__link thirdNav" href="#Experiences">
                  Experiences
                </a>
              </li>

              <li className="navigation__item">
                <a className="navigation__link fourthNav" href="#Projects">
                  Projects
                </a>
              </li>

              <li className="navigation__item">
                <a className="navigation__link fifthNav" href="#Courses">
                  Courses
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link sixthNav" href="#Interests">
                  Interests
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link seventhNav" href="/">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <hr className="nav__horizontal"></hr>
        </div>
      </div>
    );
  }
}

export default Navbar;
