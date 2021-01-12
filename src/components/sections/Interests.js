import React from "react";
import Icon from "../layouts/Icon";

const hobbies = [
  {
    name: "Chess",
    logo: "assets/chess.png",
    description: "chess.com Ratings: Rapid(912) Puzzles(1460)",
  },
  {
    name: "Badminton",
    logo: "assets/badminton.png",
    description: "BC Provincials 2018/2019 1st Doubles Regionals",
  },
  {
    name: "Tennis",
    logo: "assets/tennis.png",
    description: "Recreational Player",
  },
];

const interests = [
  {
    name: "Data Science",
    logo: "assets/data.png",
    description: null,
  },
  {
    name: "Blockchain",
    logo: "assets/blockchain.jpg",
    description: null,
  },
  {
    name: "Machine Learning",
    logo: "assets/machine-learning.png",
    description: null,
  },
];

const Interests = () => {
  return (
    <div className="interests">
      <h1 className="interests__header">Hobbies</h1>
      <hr className="interests__horizontal"></hr>
      <div className="interests__content">
        <div className="interests__content__icons">
          {hobbies.map(hobby =>
            <Icon data={hobby} />
            )}
        </div>
      </div>

      <h1 className="interests__header">Interests</h1>
      <hr className="interests__horizontal"></hr>
      <div className="interests__content">
        <div className="interests__content__icons">
        {interests.map(interest =>
            <Icon data={interest} />
            )}

        </div>
      </div>
    </div>
  );
};

export default Interests;
