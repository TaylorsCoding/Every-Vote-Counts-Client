import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import "./RegistrationPage.css";

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = (user) => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <div className="regpage-component">
        <div className="regpage-container">
          <div className="regpage-row-title">
            <div className="regpage-col-title">
              <h1 className="registrationpage-title">Register</h1>
            </div>
          </div>
          <div className="regpage-row-form">
            <div className="regpage-col-form">
              <RegistrationForm
                onRegistrationSuccess={this.handleRegistrationSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
