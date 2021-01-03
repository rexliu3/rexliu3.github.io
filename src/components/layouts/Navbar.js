import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from '@material-ui/core/styles';




class Navbar extends Component {

  state = {
    anchorEl: null
  }
 
    
    handleClick = (event) => {
      this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
      this.setState({anchorEl: null})
    };
  
  render() {
    const width = window.innerWidth;

    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: '50vw',
        margin:'1rem',

      }}));

    return (
      <div>
        {/* Navigation starts now */}
        <div className="nav" id="nav">
          <a className="nav__logo" href="#">
            Rex Liu
          </a>

          {width > 900 && (
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
            </nav>
          )}

          {width <= 900 && (
            <div className="navigation">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                Open Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}

          <hr className="nav__horizontal"></hr>
        </div>
      </div>
    );
  }
}

export default Navbar;
