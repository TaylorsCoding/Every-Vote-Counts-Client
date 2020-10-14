import React, { Component } from "react";
import GetInfoForm from "../../components/GetInfoForm/GetInfoForm";

import config from "../../config";

import "./GetInfoPage.css";

import UserContext from "../../contexts/UserContext";

export default class GetInfoPage extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleFalseAccess = () => {
    if (!window.localStorage.getItem(config.TOKEN_KEY)) {
      window.localStorage.removeItem("dropOffLocations");
      window.localStorage.removeItem("earlySites");
      window.localStorage.removeItem("address");
      window.localStorage.removeItem("votingUrls");
      this.props.history.push("/");
    }
  };

  handleGetInfoSuccess = () => {
    const { history } = this.props;
    history.push("/inforesults");
  };

  render() {
    this.handleFalseAccess();
    return (
      <div className="gip-component">
        <h1 className="gip-title">Enter an Address</h1>
        <p className="gip-note">
          Note: Some addresses will not provide locations and/or information.
        </p>
        <p>
          At a minimum, enter a street address and one other thing (either city,
          state, or zip-code).
        </p>
        <GetInfoForm onGetInfoSuccess={this.handleGetInfoSuccess} />
      </div>
    );
  }
}
