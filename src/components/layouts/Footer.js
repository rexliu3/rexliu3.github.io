import React, { Component } from "react";


class Footer extends Component {
  render() {
    return (
      <footer className="main__footer">
        <div classname="main__footer__arrow"></div>
        <div id="main__footer__icons">
              <a
                className="main__footer__icons__link"
                href="https://linkedin.com/in/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <img
                    className="main__footer__icons__logo"
                    src="assets/linkedin.png"
                    ></img>
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://github.com/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <img
                    className="main__footer__icons__logo"
                    src="assets/github.png"
                    ></img>
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://instagram.com/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <img
                    className="main__footer__icons__logo"
                    src="assets/instagram.png"
                    ></img>
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://facebook.com/rexliu333"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <img
                    className="main__footer__icons__logo"
                    src="assets/facebook.png"
                    ></img>
                </div>
              </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
