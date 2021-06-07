import React from "react";


const Navigation = () => {
  const width = window.innerWidth;
  return (
    /*<div className="nav">
      <a className="nav__logo" href="#">
            Rex Liu
          </a>
    
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navigation" id="myNav">
        <Nav className="mr-auto" className="navigation__nav">
          <Nav.Link className="navigation__link firstNav" href="#">Home</Nav.Link>
          <Nav.Link className="navigation__link secondNav" href="#AboutMe">About</Nav.Link>

          <NavDropdown title="Experiences" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>*/

    <div>
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
        </div>
      </div>
  );
};

export default Navigation;
