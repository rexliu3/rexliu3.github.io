import React from "react";
import Icon from "../layouts/Icon";

const Interests = () => {
  return (
    <div className="interests">
      <h1 className="interests__header">Interests & Hobbies</h1>
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
              "assets/linkedin.png",
              "Badminton",
              "BC Provincials 2018/2019 1st Doubles Regionals",
            ]}
          />
          <Icon
            data={[
              "assets/linkedin.png",
              "Tennis",
              "Recreational Player",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Interests;
