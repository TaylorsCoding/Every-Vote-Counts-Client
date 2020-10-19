import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";

import "./RegistrationForm.css";

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { full_name, user_name, password, confirm_password } = ev.target;

    if (password.value !== confirm_password.value) {
      this.setState({
        error: { error: "You did not successfully confirm your password." },
      });
      return;
    }

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value,
    })
      .then((user) => {
        full_name.value = "";
        user_name.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res });
      });
  };

  render() {
    const error = this.state.error;
    return (
      <div className="rf-component">
        <div className="rf-container">
          <div className="rf-row-error">
            <div className="rf-col-error">
              <h3>{error ? error.error : null}</h3>
            </div>
          </div>
          <form className="rf-form" onSubmit={this.handleSubmit}>
            <div className="full_name rf-fieldset">
              <div className="fullname-label-container">
                <label htmlFor="RegistrationForm__full_name">Full name</label>
              </div>
              <div className="fullname-input-container">
                <input
                  name="full_name"
                  type="text"
                  required
                  id="RegistrationForm__full_name"
                />
              </div>
            </div>
            <div className="user_name rf-fieldset">
              <div className="username-label-container">
                <label htmlFor="RegistrationForm__user_name">User name</label>
              </div>
              <div className="username-input-container">
                <input
                  name="user_name"
                  type="text"
                  required
                  id="RegistrationForm__user_name"
                />
              </div>
            </div>
            <div className="password rf-fieldset">
              <div className="password-label-container">
                <label htmlFor="rf-password">Password</label>
              </div>
              <div className="password-input-container">
                <input
                  name="password"
                  type="password"
                  required
                  id="rf-password"
                />
              </div>
            </div>
            <div className="confirm-password rf-fieldset">
              <div className="cp-label-container">
                <label htmlFor="rf-confirm-password">Confirm Password</label>
              </div>
              <div className="cp-input-container">
                <input
                  name="confirm_password"
                  type="password"
                  required
                  id="rf-confirm-password"
                />
              </div>
            </div>
            <input className="rf-submit-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
