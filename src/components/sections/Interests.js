import React from "react";
import Icon from "../layouts/Icon";

const interests = [
  { name: "Chess", logo: "assets/Chess.png", description: "Strategy, pattern recognition, and a good long game.", link: "https://www.chess.com/member/rexliu3" },
  { name: "Badminton", logo: "assets/badminton.png", description: "BC regional doubles champion." },
  { name: "Tennis", logo: "assets/tennis.png", description: "Always working on the next rally." },
  { name: "Data science", logo: "assets/data.png", description: "Finding useful signals in complex systems." },
  { name: "Blockchain", logo: "assets/Blockchain.jpg", description: "Exploring open, distributed infrastructure." },
  { name: "Machine learning", logo: "assets/machine-learning.png", description: "Building software that learns and adapts." },
];

const Interests = () => (
  <div>
    <div className="section-heading"><p className="section-kicker">06 · Curiosities</p><h2>Things I keep<br />coming back to.</h2></div>
    <div className="interest-grid">{interests.map((interest) => <Icon key={interest.name} data={interest} />)}</div>
    <div className="profile-notes">
      <div>
        <p className="section-kicker">Languages</p>
        <p>English · Mandarin · Spanish</p>
      </div>
      <div>
        <p className="section-kicker">Recognition</p>
        <p>Runner-up · Hack at UCI 2021</p>
        <p>Grand Winner · 41st UBC Physics Olympics</p>
      </div>
      <div>
        <p className="section-kicker">Elsewhere</p>
        <a href="https://www.linkedin.com/in/rexliu3" target="_blank" rel="noopener noreferrer">965 followers on LinkedIn ↗</a>
      </div>
    </div>
  </div>
);

export default Interests;
