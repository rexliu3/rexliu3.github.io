import React from "react";
import Icon from "../layouts/Icon";

import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';


const hobbies = [
  {
    name: "Chess",
    logo: "assets/chess.png",
    description: "chess.com ratings: Blitz(1262) Puzzles(1630)",
    link: "https://www.chess.com/member/rexliu3",
  },
  {
    name: "Badminton",
    logo: "assets/badminton.png",
    description: "BC Provincials 2018/2019 1st Doubles Regionals",
    link: null,
  },
  {
    name: "Tennis",
    logo: "assets/tennis.png",
    description: "Recreational Player",
    link: null,
  },
];

const interests = [
  {
    name: "Data Science",
    logo: "assets/data.png",
    description: null,
    link: null,
  },
  {
    name: "Blockchain",
    logo: "assets/blockchain.jpg",
    description: null,
    link: null,
  },
  {
    name: "Machine Learning",
    logo: "assets/machine-learning.png",
    description: null,
    link: null,
  },
];

const Interests = () => {
  return (
    <div className="interests">
      <Bounce top duration={2000}>
        <h1 className="interests__header">Hobbies</h1>
        <hr className="interests__horizontal"></hr>
      </Bounce>
      <div className="interests__content">
      <Flip bottom duration={3000} delay={1000}>
        <div className="interests__content__icons">
          {hobbies.map(hobby =>
            <Icon data={hobby} />
            )}
        </div>
        </Flip>
      </div>

      <Bounce top duration={2000}>
        <h1 className="interests__header">Interests</h1>
        <hr className="interests__horizontal"></hr>
      </Bounce>
      <div className="interests__content">
      <Flip bottom duration={3000} delay={1000}>
        <div className="interests__content__icons">
        {interests.map(interest =>
            <Icon data={interest} />
            )}

        </div>
        </Flip>
      </div>
    </div>
  );
};

export default Interests;
