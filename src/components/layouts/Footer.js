import React, { Component } from "react";

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

class Footer extends Component {
  render() {
    return (
      <footer className="main__footer">
        <a className="main__footer__box" href="#">
            <DoubleArrowIcon
              className="main__footer__box__arrow"
              fontSize='large'/>
              </a>
        <div id="main__footer__icons">
              <a
                className="main__footer__icons__link"
                href="https://linkedin.com/in/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <LinkedInIcon
                      className="main__footer__icons__logo"
                      fontSize='large'
                    />
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://github.com/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <GitHubIcon
                      className="main__footer__icons__logo"
                      fontSize='large'
                      />
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://instagram.com/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon">
                    <InstagramIcon
                      className="main__footer__icons__logo"
                      fontSize='large'
                      />
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://facebook.com/rexliu333"
                target="_blank"
              >
                 <div className="main__footer__icons__icon">
                    <FacebookIcon
                      className="main__footer__icons__logo"
                      fontSize='large'
                      />
                </div>
              </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
