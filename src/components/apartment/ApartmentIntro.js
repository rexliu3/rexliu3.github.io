import React from "react";

export default function ApartmentIntro({ settings }) {
  return (
    <section className="apartment-intro" aria-labelledby="welcome-title">
      <div className="welcome-note">
        <span /> {settings.introEyebrow}
      </div>
      <h1 id="welcome-title">
        {settings.introTitle} <em>{settings.introEmphasis}</em>
      </h1>
      <p>
        {settings.introLines.map((line, index) => (
          <React.Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
}
