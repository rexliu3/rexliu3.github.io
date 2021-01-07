import React from "react";

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const NotFoundPage = () => (
  <section>
    <div className="notfound__content">
      <h1 className="notfound__content__label">Wrong Page</h1>
      <a href="/" className="notfound__content__link">
        <button className="btn-sm notfound__content__button">Home</button>
      </a>
    </div>
    <footer className="main__footer">
        <div className="main__footer__icons">
              <a
                className="main__footer__icons__link"
                href="https://linkedin.com/in/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon" id="icon">
                    <LinkedInIcon
                      className="main__footer__icons__logo" 
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                    />
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://github.com/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon" id="icon">
                    <GitHubIcon
                      className="main__footer__icons__logo"
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                      />
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://instagram.com/rexliu3"
                target="_blank"
              >
                <div className="main__footer__icons__icon" id="icon">
                    <InstagramIcon
                      className="main__footer__icons__logo"
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                      />
                </div>
              </a>
              <a
                className="main__footer__icons__link"
                href="https://facebook.com/rexliu333"
                target="_blank"
              >
                 <div className="main__footer__icons__icon" id="icon">
                    <FacebookIcon
                      className="main__footer__icons__logo"
                      id="logo"
                      fontSize='large'
                      style={{height:'50px',
                        width:'50px'}}
                      />
                </div>
              </a>
        </div>
      </footer>
  </section>
); 

export default NotFoundPage;
