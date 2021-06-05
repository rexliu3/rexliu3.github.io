import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

import PersonIcon from "@material-ui/icons/Person";
import ExtensionIcon from "@material-ui/icons/Extension";
import AppsIcon from "@material-ui/icons/Apps";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";

import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const styles = (theme) => ({
  paper: {
    border: "1px solid #d3d4d5",
  },
  button: {
    color: "white",
    left: "50vw",
    top: "2vw",
  },
  menu: {
    zIndex: "99999999999",
  },
  item: {
    zIndex: "99999999999",
  },
  icon: {
    verticalAlign: "middle",
    margin: "auto",
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

class Navbar extends Component {
  state = {
    anchorEl: null,
    opens: false,
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, opens: !this.state.opens });
  };

  handleClose = (nav) => {
    this.setState({ anchorEl: null, opens: false });
    window.location.href = nav;
  };

  handleClickAway = () => {
    this.state.opens = false;
  };

  render() {
    const width = window.innerWidth;
    const { classes } = this.props;
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
                  <a className="navigation__link fifthNav" href="#Extracurriculars">
                    Extracurriculars
                  </a>
                </li>
                <li className="navigation__item">
                  <a className="navigation__link sixthNav" href="#Courses">
                    Courses
                  </a>
                </li>
                <li className="navigation__item" id="fun_facts">
                  <a className="navigation__link seventhNav" href="#Interests">
                    Fun Facts
                  </a>
                </li>
              </ul>
            </nav>
          )}

          {/*width <= 900 && (
            <ClickAwayListener mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={this.handleClickAway}>
              <div className="navigation">
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  className={classes.button}
                >
                  <MenuIcon className={classes.icon} fontSize="large" />
                </Button>

                {this.state.opens ? (
                  <Portal>
                    <StyledMenu
                      id="customized-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          this.handleClose("#Experiences");
                        }}
                      >
                        <ListItemIcon>
                          <PersonIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                      </MenuItem>

                      <MenuItem>
                        <ListItemIcon>
                          <ExtensionIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Experiences" />
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <AppsIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <AccountBalanceIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Courses" />
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <BubbleChartIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Fun Facts" />
                      </MenuItem>
                    </StyledMenu>
                  </Portal>
                ) : null}
              </div>
            </ClickAwayListener>
          )*/}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navbar);
