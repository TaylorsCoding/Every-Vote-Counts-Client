import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";

import UserContext from "../../contexts/UserContext";

import "./LoginPage.css";

export default class LoginPage extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    error: null,
  };

  handleLoginSuccess = () => {
    if (TokenService.hasAuthToken()) {
      AuthApiService.getUser(TokenService.getAuthToken())
        .then((res) => {
          this.context.setUser(res);
        })
        .catch((err) => {
          this.setState({ error: err });
        });
    }
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <div className="login-page-container">
        <h2 className="login-title">Login</h2>
        <div className="lp-error-container">
          {this.state.error ? this.state.error.error : null}
        </div>
        <div className="lp-demo-cred-container">
          <p>Demo Credentials: </p>
          <p>
            Username: <span className="lp-readable">test</span>
          </p>
          <p>
            Password: <span className="lp-readable">Tester12!</span>
          </p>
        </div>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}
