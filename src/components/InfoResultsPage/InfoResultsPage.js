import React, { Component } from "react";

import config from "../../config";

import UserContext from "../../contexts/UserContext";

import UserService from "../../services/user-service";
import TokenService from "../../services/token-service";

import MapComponent from "../MapComponent/MapComponent";
import TextResults from "../TextResults/TextResults";

import "./InfoResultsPage.css";

import MapMarker from "./mapmarker.png";
import EarlyMarker from "./earlymarker.png";
import FusionMarker from "./fusionmarker.png";

export default class InfoResultsPage extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    addressSaved: false,
    error: null,
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

  hasCompleteResponse = () => {
    return window.localStorage.getItem("dropOffLocations") &&
      window.localStorage.getItem("earlySites") &&
      window.localStorage.getItem("address") &&
      window.localStorage.getItem("votingUrls")
      ? true
      : false;
  };

  compileResults = (locs, early, address, urls) => {
    if (this.hasCompleteResponse()) {
      return (
        <div>
          <MapComponent
            locs={locs}
            early={early}
            address={address}
            urls={urls}
          />
          <TextResults address={address} urls={urls} locations={true} />
        </div>
      );
    } else {
      if (!!locs && !!early) {
        return <TextResults address={address} urls={urls} locations={false} />;
      } else {
        return (
          <MapComponent
            locs={locs ? locs : []}
            early={early ? early : []}
            address={address ? address : {}}
            urls={urls ? urls : {}}
          />
        );
      }
    }
  };

  determineIfSavable = (user) => {
    if (this.determineIfSaved(user)) {
      return null;
    } else {
      if (
        user &&
        user.user &&
        user.user.addresses &&
        user.user.addresses.length >= 5
      ) {
        return null;
      } else {
        return (
          <div className="irp-save-address-container">
            <button
              className="irp-save-address-button"
              onClick={this.saveAddress}
            >
              Save Address
            </button>
          </div>
        );
      }
    }
  };

  determineIfSaved = (user) => {
    const storedAddress = window.localStorage.getItem("address")
      ? JSON.parse(window.localStorage.getItem("address"))
      : "";

    const address = `${`${storedAddress.line1}, `}${
      storedAddress.city
        ? storedAddress.city.length > 0
          ? `${storedAddress.city}, `
          : null
        : null
    }${
      storedAddress.state
        ? storedAddress.state.length > 0
          ? `${storedAddress.state}, `
          : null
        : null
    }${
      storedAddress.zip
        ? storedAddress.zip.length > 0
          ? `${storedAddress.zip}`
          : null
        : null
    }`;

    const savedAddresses = user
      ? user.user
        ? user.user.addresses
          ? user.user.addresses
          : []
        : []
      : [];
    for (let i = 0; i < savedAddresses.length; i++) {
      if (address === savedAddresses[i]) {
        return true;
      }
    }
    return false;
  };

  saveAddress = (ev) => {
    ev.preventDefault();

    const storedAddress = window.localStorage.getItem("address")
      ? JSON.parse(window.localStorage.getItem("address"))
      : "";

    const address = `${`${storedAddress.line1}, `}${
      storedAddress.city.length > 0 ? `${storedAddress.city}, ` : null
    }${storedAddress.state.length > 0 ? `${storedAddress.state}, ` : null}${
      storedAddress.zip.length > 0 ? `${storedAddress.zip}` : null
    }`;

    const user = TokenService.getAuthToken();

    UserService.postAddress({
      user_name: user,
      address: address,
    })
      .then((user) => {
        this.context.setUser(user);
        this.setState({ addressSaved: true });
      })
      .catch((res) => {
        this.setState({ error: res });
      });
  };

  render() {
    this.handleFalseAccess();

    const cDOL = window.localStorage.getItem("dropOffLocations")
      ? JSON.parse(window.localStorage.getItem("dropOffLocations"))
      : [];
    const cEVS = window.localStorage.getItem("earlySites")
      ? JSON.parse(window.localStorage.getItem("earlySites"))
      : [];
    const cAdd = window.localStorage.getItem("address")
      ? JSON.parse(window.localStorage.getItem("address"))
      : {};
    const cURL = window.localStorage.getItem("votingUrls")
      ? JSON.parse(window.localStorage.getItem("votingUrls"))
      : {};

    const { currentUser = {} } = this.context;

    return (
      <div className="irp-component">
        <div className="irp-title-container">
          <h1 className="irp-title">Results</h1>
        </div>
        <div className="irp-error-container">
          {this.state.error ? this.state.error.error : null}
        </div>
        {this.hasCompleteResponse() ? (
          <div>
            <div className="irp-legend-container-mobile">
              <div className="irp-legend-row-mobile">
                <h3>Key</h3>
              </div>
              <div className="irp-legend-row-mobile irp-row-mobile">
                <label
                  className="irp-dropoff-label-mobile"
                  htmlFor="irp-image-1"
                >
                  Drop Off Location
                </label>
                <img
                  id="irp-image-1"
                  className="irp-image irp-regularsite-image-mobile"
                  src={MapMarker}
                  alt="regular drop off location marker"
                />
              </div>
              <div className="irp-legend-row-mobile irp-row-mobile">
                <label className="irp-fusion-label-mobile">
                  Drop Off Location/Early Voting Site
                </label>
                <img
                  className="irp-image irp-fusionsite-image-mobile"
                  src={FusionMarker}
                  alt="early voting site marker"
                />
              </div>
              <div className="irp-legend-row-mobile irp-row-mobile">
                <label className="irp-early-label-mobile">
                  Early Voting Site
                </label>
                <img
                  className="irp-image irp-earlysite-image-mobile"
                  src={EarlyMarker}
                  alt="early voting site marker"
                />
              </div>
            </div>

            {/** DIVISION HERE */}

            <div className="irp-legend-container">
              <div className="irp-legend-row">
                <h3>Key</h3>
              </div>
              <div className="irp-legend-row">
                <div className="irp-legend-col irp-legend-col1">
                  <label className="irp-dropoff-label" htmlFor="irp-image-1">
                    Drop Off Location
                  </label>
                  <img
                    id="irp-image-1"
                    className="irp-image irp-regularsite-image"
                    src={MapMarker}
                    alt="regular drop off location marker"
                  />
                </div>
                <div className="irp-legend-col irp-legend-col2">
                  <img
                    className="irp-image irp-fusionsite-image"
                    src={FusionMarker}
                    alt="early voting site marker"
                  />
                  <label className="irp-fusion-label">
                    Drop Off Location/Early Voting Site
                  </label>
                </div>
                <div className="irp-legend-col irp-legend-col3">
                  <img
                    className="irp-image irp-earlysite-image"
                    src={EarlyMarker}
                    alt="early voting site marker"
                  />
                  <label className="irp-early-label"> Early Voting Site</label>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {this.compileResults(cDOL, cEVS, cAdd, cURL)}
        {this.state.addressSaved ? <p>Address saved!</p> : null}
        {this.state.addressSaved ? null : this.determineIfSavable(currentUser)}
      </div>
    );
  }
}
