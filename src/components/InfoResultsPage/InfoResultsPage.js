import React, { Component } from "react";

import MapComponent from "../MapComponent/MapComponent";

import config from "../../config";

export default class InfoResultsPage extends Component {
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
    if (
      !JSON.parse(window.localStorage.getItem("dropOffLocations")) ||
      !JSON.parse(window.localStorage.getItem("earlySites")) ||
      !JSON.parse(window.localStorage.getItem("address")) ||
      !JSON.parse(window.localStorage.getItem("votingUrls"))
    ) {
      this.props.history.push("/");
    }
  };

  render() {
    const cDOL = JSON.parse(window.localStorage.getItem("dropOffLocations"));
    const cEVS = JSON.parse(window.localStorage.getItem("earlySites"));
    const cAdd = JSON.parse(window.localStorage.getItem("address"));
    const cURL = JSON.parse(window.localStorage.getItem("votingUrls"));

    this.handleFalseAccess();

    return (
      <div>
        <h1>Results</h1>
        <MapComponent locs={cDOL} early={cEVS} address={cAdd} urls={cURL} />
      </div>
    );
  }
}
