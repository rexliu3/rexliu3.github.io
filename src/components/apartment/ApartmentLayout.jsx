import React from "react";
import { Icon } from "./Icon";

export function ApartmentHeader({ settings, onOpen }) {
  return (
    <header className="apartment-header">
      <a className="brand" href="/" aria-label={`${settings.brand} home`}>
        <span className="brand-icon">
          <Icon name="home" size={20} />
        </span>{" "}
        {settings.brand}
        <span className="brand-period">.</span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="#explore">The apartment</a>
        <a href="#out-and-about">Out & about</a>
        <button type="button" onClick={() => onOpen("resume")}>
          Résumé <Icon name="arrow" size={14} />
        </button>
      </nav>
      <div className="header-right">
        <span className="location">
          <span className="status-dot" /> {settings.location}
        </span>
        <a className="say-hello" href={`mailto:${settings.email}`}>
          {settings.helloLabel}
          <Icon name="arrow" size={15} />
        </a>
      </div>
    </header>
  );
}
export function ApartmentFooter({ settings }) {
  return (
    <footer className="apartment-footer">
      <p>{settings.footerTagline}</p>
      <div>
        <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <span>
          © {new Date().getFullYear()} {settings.name}
        </span>
      </div>
    </footer>
  );
}
