import React from "react";
import { NavLink } from "react-router-dom";

import AmericanFlag from "./americanFlag.png";

import "./Header.css";

export default function Header(props) {
  return (
    <div className="header-container">
      <div className="header-component">
        <img className="header-image" src={AmericanFlag} alt="American logo" />
        <NavLink className="header-link" to="/">
          <h1 className="header-title">
            <span className="title-font">EVERY VOTE COUNTS</span>
          </h1>
        </NavLink>
        <img className="header-image" src={AmericanFlag} alt="American logo" />
      </div>
    </div>
  );
}
