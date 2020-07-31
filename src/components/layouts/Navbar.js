import React, { Component } from "react";

class Navbar extends Component {
  state = {
    
  };

  componentDidMount = () => {

  };

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
          <a className="nav__logo" href="/">
            {//<img src="assets/images/logo.png" className="nav__logo__image" />
            }
          </a>
          <nav className="navigation" id="myNav">
            <a
              href="#"
              className="navigation__close"
              onClick={this.closeNavbar}
            >
              {//&times;
              }
            </a>

            <ul className="navigation__nav">
              <li className="navigation__item">
                    <a className="navigation__link" href="/">
                      
                    </a>
              </li>
            </ul>
          </nav>
          <span className="navigation__open" onClick={this.openNavbar} />
          {//&#9776;
          }
        </div>
      </div>
    );
  }
}

export default Navbar;
