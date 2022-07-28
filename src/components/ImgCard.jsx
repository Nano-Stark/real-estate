import "./ImgCard.css";
import Benz from "../assets/Benz.jpg";

import React from "react";

const ImgCard = () => {
  return (
    <div className="imgcard__container">
      <div className="imgcard">
        <img className="imgcard__img" src={Benz} />
        <p className="imgcard__desc">Description</p>
        <button className="imgcard__button">Upload</button>
      </div>
    </div>
  );
};

export default ImgCard;
