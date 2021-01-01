import React from "react";
import Icon from "../layouts/Icon";

const Interests = () => {
  return (
    <div className="interests">
      <h1 className="interests__header">Hobbies</h1>
      <hr className="interests__horizontal"></hr>
      <div className="interests__content">
        <div className="interests__content__icons">
          <Icon
            data={[
              "assets/chess.png",
              "Chess",
              "chess.com Ratings: Rapid(912) Puzzles(1460)",
              '0.75'
            ]}
          />
          <Icon
            data={[
              "assets/badminton.png",
              "Badminton",
              "BC Provincials 2018/2019 1st Doubles Regionals",
            ]}
          />
          <Icon
            data={[
              "assets/tennis.png",
              "Tennis",
              "Recreational Player",
            ]}
          />
        </div>
      </div>

      <h1 className="interests__header">Interests</h1>
      <hr className="interests__horizontal"></hr>
      <div className="interests__content">
        <div className="interests__content__icons">
          <Icon
            data={[
              "assets/data.png",
              "Data Science",
              "",
            ]}
          />
          <Icon
            data={[
              "assets/blockchain.jpg",
              "Blockchain",
              "",
            ]}
          />
          <Icon
            data={[
              "assets/machine.png",
              "Machine Learning",
              "",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Interests;
