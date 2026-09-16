import React from "react";
import { Icon } from "./Icon";

export default function ApartmentIntro({ settings, onOpen }) {
  return (
    <section className="apartment-intro" aria-labelledby="welcome-title">
      <div className="intro-heading">
        <div className="welcome-note">
          <span /> {settings.introEyebrow}
        </div>
        <h1 id="welcome-title">
          {settings.introTitle} <em>{settings.introEmphasis}</em>
        </h1>
        <span className="intro-annotation" aria-hidden="true">
          come on in ↴
        </span>
      </div>
      <div className="intro-copy">
        <p>
          {settings.introLines.map((line, index) => (
            <React.Fragment key={line}>
              {index > 0 && (
                <>
                  {" "}
                  <br />
                </>
              )}
              {line}
            </React.Fragment>
          ))}
        </p>
        <button className="intro-button" type="button" onClick={() => onOpen("portrait")}>
          Start with an intro <Icon name="arrow" size={16} />
        </button>
      </div>
    </section>
  );
}
