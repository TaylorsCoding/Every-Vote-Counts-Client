import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

import UserContext from "../../contexts/UserContext";

import "./LoginForm.css";

export default class LoginForm extends Component {
  static contextType = UserContext;

  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res });
      });
  };

  render() {
    const error = this.state.error;
    return (
      <form className="login-form" onSubmit={this.handleSubmitJwtAuth}>
        <div className="lf-row-error">
          <div className="lf-col-error">
            <h3>{error ? error.error : null}</h3>
          </div>
        </div>
        <div className="user_name">
          <div>
            <label className="loginform-un-label" htmlFor="loginform-username">
              User name
            </label>
          </div>
          <div>
            <input required name="user_name" id="loginform-username" />
          </div>
        </div>
        <div className="password">
          <div>
            <label
              className="loginform-password-label"
              htmlFor="LoginForm__password"
            >
              Password
            </label>
          </div>
          <div>
            <input
              required
              name="password"
              type="password"
              id="LoginForm__password"
            />
          </div>
        </div>
        <div>
          <input className="loginform-submit" type="submit" value="login" />
        </div>
      </form>
    );
  }
}
