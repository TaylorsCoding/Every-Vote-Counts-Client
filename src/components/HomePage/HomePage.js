import React, { Component } from "react";

import TokenService from "../../services/token-service";

import UserContext from "../../contexts/UserContext";
import { NavLink } from "react-router-dom";

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
      <div>
        {currentUser.user ? null : (
          <div>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
            <NavLink to="/register">
              <button>Create Account</button>
            </NavLink>
          </div>
        )}

        {currentUser.user ? (
          <div>
            <h1>Welcome, {currentUser.user.user_name}!</h1>
            <NavLink to="/getinfo">
              <button width="100px" height="50px">
                Get Info
              </button>
            </NavLink>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : null}
      </div>
    );
  }
}
