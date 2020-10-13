import React, { Component } from "react";
import GetInfoForm from "../../components/GetInfoForm/GetInfoForm";

import config from "../../config";

// import AuthApiService from "../../services/auth-api-service";
// import TokenService from "../../services/token-service";

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
      <section className="GetInfoPage">
        <h2>Get Info</h2>
        <GetInfoForm onGetInfoSuccess={this.handleGetInfoSuccess} />
      </section>
    );
  }
}
