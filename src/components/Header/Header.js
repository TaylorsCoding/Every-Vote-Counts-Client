import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div>
      <NavLink to="/">
        <h1>Every Vote Counts</h1>
      </NavLink>
    </div>
  );
}
