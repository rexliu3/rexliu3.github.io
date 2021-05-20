import React, { Component } from "react";

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

import RubberBand from 'react-reveal/RubberBand';
import Jump from 'react-reveal/Jump';


class Footer extends Component {
  render() {
    return (
      <footer className="main__footer">
        <a className="main__footer__box" href="#">
          <Jump duration={3000}>
            <DoubleArrowIcon
              className="main__footer__box__arrow"
              fontSize='large'/>
              </Jump>
              </a>
              
        <div className="main__footer__icons">
              <a
                className="main__footer__icons__link"
                href="https://linkedin.com/in/rexliu3"
                target="_blank"
              >
                <RubberBand duration={3000} delay={1000}>
                <div className="main__footer__icons__icon" id="icon">
                  
                    <LinkedInIcon
                      className="main__footer__icons__logo" 
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                    />
                    
                </div>
                </RubberBand>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://github.com/rexliu3"
                target="_blank"
              >
                <RubberBand duration={3000} delay={2000}>
                <div className="main__footer__icons__icon" id="icon">
                    <GitHubIcon
                      className="main__footer__icons__logo"
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                      />
                </div>
                </RubberBand>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://instagram.com/rexliu3"
                target="_blank"
              >
                <RubberBand duration={3000} delay={3000}>

                <div className="main__footer__icons__icon" id="icon">
                    <InstagramIcon
                      className="main__footer__icons__logo"
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                      />
                </div>
                </RubberBand>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://facebook.com/rexliu333"
                target="_blank"
              >
                <RubberBand duration={3000} delay={4000}>
                 <div className="main__footer__icons__icon" id="icon">
                    <FacebookIcon
                      className="main__footer__icons__logo"
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                      />
                </div>
                </RubberBand>
              </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
