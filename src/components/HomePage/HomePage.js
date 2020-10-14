import React, { Component } from "react";

import TokenService from "../../services/token-service";

import UserContext from "../../contexts/UserContext";
import { NavLink } from "react-router-dom";

import "./HomePage.css";

export default class HomePage extends Component {
  static contextType = UserContext;

  state = {
    sent: false,
  };

  componentDidMount() {}

  logout = () => {
    TokenService.clearAuthToken();
    this.context.clearUser();
  };

  render() {
    const { currentUser = {} } = this.context;

    return (
      <div className="homepage-container">
        {currentUser.user ? null : (
          <div className="homepage-notloggedincomp">
            <h1 className="homepage-welcome-title">
              <span className="homepage-welcome-titletext">WELCOME</span>
            </h1>
            <div className="homepage-wi-container">
              <p className="homepage-welcome-information">
                Never has there been a time where it has been as important to
                vote! That's why we're providing you with an app that allows you
                to find voting locations as well as voting information relevant
                to your area. Just create an account, or login if you already
                have one, and then press "Get Info". You will then be asked to
                enter an address, and when you do, you'll be taken to the page
                that shows you all this information!
              </p>
            </div>
            <div className="homepage-actions-container">
              <h2 className="homepage-login-question">Have an account?</h2>
              <div className="homepage-loginbutton-container">
                <NavLink className="homepage-link" to="/login">
                  <button className="homepage-login-button">Login</button>
                </NavLink>
              </div>
              <h2 className="homepage-ca-statement">
                If not, create one! Then you can find your voting locations!
              </h2>
              <div className="homepage-cabutton-container">
                <NavLink className="homepage-link" to="/register">
                  <button className="homepage-ca-button">Create Account</button>
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {currentUser.user ? (
          <div>
            <h1 className="homepage-welcome-title">
              <span className="homepage-welcome-titletext">
                Welcome, {currentUser.user.full_name}!
              </span>
            </h1>
            <div className="homepage-wi-container">
              <p className="homepage-welcome-information">
                Press the Get Info button to enter an address and get your
                voting locations! On top of that, it will most likely provide
                you (depending on what the Google Civic Information API
                provides) with websites that give you a variety of information,
                including voting registration, voting regulation, and your local
                electorates.
              </p>
            </div>
            <div className="homepage-actions-container">
              <div className="homepage-getinfobutton-container">
                <NavLink to="/getinfo">
                  <button className="homepage-getinfo-button">Get Info</button>
                </NavLink>
              </div>
              <div className="homepage-logoutbutton-container">
                <button
                  className="homepage-logout-button"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
