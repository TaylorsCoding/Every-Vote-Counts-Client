import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer(props) {
  return (
    <div>
      <p>
        <NavLink to="/aboutus">About Us</NavLink>
      </p>
      <p>
        <NavLink to="/termsandconditions">Terms and Conditions</NavLink>
      </p>
    </div>
  );
}
