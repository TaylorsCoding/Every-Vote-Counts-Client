import React, { Component } from "react";

import MapComponent from "../MapComponent/MapComponent";

import config from "../../config";
import TextResults from "../TextResults/TextResults";

import "./InfoResultsPage.css";

import MapMarker from "./mapmarker.png";
import EarlyMarker from "./earlymarker.png";
import FusionMarker from "./fusionmarker.png";

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

    console.log(cAdd);

    return (
      <div className="irp-component">
        <div className="irp-title-container">
          <h1 className="irp-title">Results</h1>
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
      </div>
    );
  }
}
