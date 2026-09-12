import React, { useState } from "react";

const links = [
  ["About", "#AboutMe"],
  ["Experience", "#Experiences"],
  ["Work", "#Projects"],
  ["Beyond work", "#Extracurriculars"],
  ["More", "#Interests"],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`site-nav ${isOpen ? "site-nav--open" : ""}`}>
      <a className="site-nav__brand" href="#Home" onClick={() => setIsOpen(false)}>
        <span className="site-nav__mark" aria-hidden="true">R</span>
        <span>Rex Liu</span>
      </a>
      <button
        className="site-nav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span /><span />
      </button>
      <nav className="site-nav__links" id="primary-navigation" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setIsOpen(false)}>{label}</a>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
