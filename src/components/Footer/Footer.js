import React from "react";
import { NavLink } from "react-router-dom";

import "./Footer.css";

export default function Footer(props) {
  return (
    <div className="footer-component">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col1">
            <p className="footer-aboutus">
              <NavLink className="footer-link" to="/aboutus">
                <span className="footer-autext">About Us</span>
              </NavLink>
            </p>
            <p className="footer-termsandconditions">
              <NavLink className="footer-link" to="/termsandconditions">
                <span className="footer-tnctext">Terms and Conditions</span>
              </NavLink>
            </p>
          </div>
          <div className="footer-col2">
            <p className="footer-copyright">
              &#169;{new Date().getFullYear()} William Taylor Simpson
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
