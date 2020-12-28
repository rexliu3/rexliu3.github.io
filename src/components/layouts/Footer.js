import React, { Component } from "react";


class Footer extends Component {
  render() {
    return (
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
    );
  }
}

export default Footer;
