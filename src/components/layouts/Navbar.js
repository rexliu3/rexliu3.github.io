import React, { Component } from "react";
import { useState, useEffect } from 'react';

class Navbar extends Component {

  render() {
    

    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }
    
    function useWindowDimensions() {
      const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      return windowDimensions;
    }
    
    const { height, width } = useWindowDimensions();
    return (
      <div>
        {/* Navigation starts now */}
        <div className="nav" id="nav">
          <a className="nav__logo" href="#">
            Rex Liu
          </a>

          {width > 900 && 
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
                  Fun Facts
                </a>
              </li>
            </ul>
          </nav>}

          
          <hr className="nav__horizontal"></hr>
        </div>
      </div>
    );
  }
}

export default Navbar;
