import React from "react";
import { Icon } from "./Icon";

export function ApartmentHeader({ settings }) {
  return (
    <header className="apartment-header">
      <a className="brand" href="/" aria-label={`${settings.brand} home`}>
        <span className="brand-icon">
          <Icon name="home" size={20} />
        </span>{" "}
        {settings.brand}
        <span className="brand-period">.</span>
      </a>
      <div className="header-right">
        <span className="location">
          <span className="status-dot" /> {settings.location}
        </span>
        <a className="say-hello" href={`mailto:${settings.email}`}>
          {settings.helloLabel} <span>↗</span>
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
          GitHub ↗
        </a>
        <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <span>
          © {new Date().getFullYear()} {settings.name}
        </span>
      </div>
    </footer>
  );
}
