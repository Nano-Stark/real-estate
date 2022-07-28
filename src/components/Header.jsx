import "./Header.css";

import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <img src="http://placehold.it" />
        <h4>Pixtogram</h4>
      </div>

      <div className="header__right">
        <button className="header__button">Upload</button>
        <p>Username</p>
      </div>
    </div>
  );
};

export default Header;
