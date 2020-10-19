import React, { Component } from "react";

import UserContext from "../../contexts/UserContext";

import TokenService from "../../services/token-service";
import UserService from "../../services/user-service";

import SavedAddress from "../SavedAddress/SavedAddress";

import "./SavedAddressesPage.css";
import { NavLink } from "react-router-dom";

export default class SavedAddressesPage extends Component {
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

  handleDeleteAll = (ev) => {
    ev.preventDefault();

    const user = TokenService.getAuthToken();

    UserService.deleteAllAddresses(user)
      .then((user) => {
        this.context.setUser(user);
      })
      .catch((res) => {
        this.setState({ error: res });
      });
  };

  handleGetInfoSuccess = () => {
    const { history } = this.props;
    history.push("/inforesults");
  };

  render() {
    const { currentUser = {} } = this.context;

    return (
      <div className="sap-component">
        <div className="sap-title-container">
          <h1>Saved Addresses</h1>
        </div>
        <div className="sap-error-container">
          {this.state.error ? this.state.error.error : null}
        </div>
        <div className="sap-description-container">
          <p>
            Click on a saved address to get the information associated with that
            address!
          </p>
        </div>
        <div className="sap-addresses-container">
          {currentUser.user
            ? currentUser.user.addresses
              ? currentUser.user.addresses.length > 0
                ? currentUser.user.addresses.map((address, idx) => (
                    <SavedAddress
                      key={`sa${idx}`}
                      address={address}
                      onGetInfoSuccess={this.handleGetInfoSuccess}
                    />
                  ))
                : null
              : null
            : null}
        </div>
        {currentUser.user ? (
          currentUser.user.addresses ? (
            currentUser.user.addresses.length > 0 ? (
              <div className="sap-delete-container">
                <button
                  className="sap-delete-button"
                  onClick={this.handleDeleteAll}
                >
                  Delete All Addresses
                </button>
              </div>
            ) : null
          ) : null
        ) : null}

        <div className="sap-back-container">
          <NavLink to="/">
            <button className="sap-back-button">Back</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
