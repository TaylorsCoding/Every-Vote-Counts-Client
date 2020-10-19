import React, { Component } from "react";

import UserService from "../../services/user-service";
import TokenService from "../../services/token-service";

import UserContext from "../../contexts/UserContext";

import xMark from "./x-mark.png";

import "./SavedAddress.css";

export default class SavedAddress extends Component {
  static contextType = UserContext;
  state = {
    error: null,
  };
  getInfo = (ev) => {
    ev.preventDefault();

    window.localStorage.removeItem("dropOffLocations");
    window.localStorage.removeItem("earlySites");
    window.localStorage.removeItem("address");
    window.localStorage.removeItem("votingUrls");

    const address = ev.target.innerText.substring(
      0,
      ev.target.innerText.length - 1
    );

    var req = window.gapi.client.request({
      path: "/civicinfo/v2/voterinfo",
      params: {
        electionId: 7000,
        address: address,
      },
    });
    req.execute((response, rawResponse) => {
      if (response.dropOffLocations) {
        window.localStorage.setItem(
          "dropOffLocations",
          JSON.stringify(response.dropOffLocations)
        );
      }
      if (response.earlyVoteSites) {
        window.localStorage.setItem(
          "earlySites",
          JSON.stringify(response.earlyVoteSites)
        );
      }
      if (response.normalizedInput) {
        window.localStorage.setItem(
          "address",
          JSON.stringify(response.normalizedInput)
        );
      }
      if (response.state) {
        window.localStorage.setItem(
          "votingUrls",
          JSON.stringify(response.state[0].electionAdministrationBody)
        );
      }
      this.props.onGetInfoSuccess();
    });
  };

  deleteAddress = (ev) => {
    const user = TokenService.getAuthToken();
    const address = ev.target.parentElement.parentElement.firstChild.innerText.substring(
      0,
      ev.target.parentElement.parentElement.firstChild.innerText.length - 1
    );

    UserService.deleteOneAddress(user, address)
      .then((user) => {
        this.context.setUser(user);
      })
      .catch((res) => {
        this.setState({ error: res });
      });
  };
  render() {
    return (
      <div className="sa-component">
        <div className="sa-error-container">
          {this.state.error ? this.state.error.error : null}
        </div>
        <p className="sa-content">
          <span className="sa-text" onClick={this.getInfo}>
            {this.props.address}{" "}
          </span>
          <button className="sa-delete-button" onClick={this.deleteAddress}>
            <img className="sa-x-image" src={xMark} alt="delete button" />
          </button>
        </p>
      </div>
    );
  }
}
