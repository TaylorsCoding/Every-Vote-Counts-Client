import React, { Component } from "react";

import GoogleMapReact from "google-map-react";
import Location from "../Location/Location";

export default class MapComponent extends Component {
  static defaultProps = {
    center: {
      lat: 38.91,
      lng: -77.04,
    },
    zoom: 11,
  };

  state = { locs: this.props.locs, early: this.props.early, fusion: [] };

  componentDidMount() {
    this.organizeLocations();
  }

  organizeLocations = () => {
    let locations = [...this.state.locs];
    let earlyLocs = [...this.state.early];

    let fusionLocs = [];

    for (let i = 0; i < locations.length; i++) {
      for (let j = 0; j < earlyLocs.length; j++) {
        if (
          locations[i].address.line1 === earlyLocs[j].address.line1 ||
          (locations[i].latitude === earlyLocs[j].latitude &&
            locations[i].longitude === earlyLocs[j].longitude)
        ) {
          fusionLocs.push(locations[i]);
          fusionLocs[fusionLocs.length - 1].fusion = true;
        }
      }
    }

    for (let i = 0; i < locations.length; i++) {
      for (let j = 0; j < fusionLocs.length; j++) {
        if (
          locations[i].address.line1 === fusionLocs[j].address.line1 ||
          (locations[i].latitude === fusionLocs[j].latitude &&
            locations[i].longitude === fusionLocs[j].longitude)
        ) {
          locations.splice(i, 1);
        }
      }
    }

    for (let i = 0; i < earlyLocs.length; i++) {
      earlyLocs[i].early = true;
      for (let j = 0; j < fusionLocs.length; j++) {
        if (
          earlyLocs[i].address.line1 === fusionLocs[j].address.line1 ||
          (earlyLocs[i].latitude === fusionLocs[j].latitude &&
            earlyLocs[i].longitude === fusionLocs[j].longitude)
        ) {
          earlyLocs.splice(i, 1);
        }
      }
    }

    this.setState({ locs: locations, early: earlyLocs, fusion: fusionLocs });
  };

  populateLocations = () => {
    const allLocations = [
      ...this.state.locs,
      ...this.state.early,
      ...this.state.fusion,
    ];
    return allLocations.map((location, idx) => (
      <Location
        key={`location${idx}`}
        name={location.address.locationName}
        street={location.address.line1}
        city={location.address.city}
        zipCode={location.address.zip}
        pollingHours={location.pollingHours}
        start={location.startDate}
        end={location.endDate}
        lat={location.latitude}
        lng={location.longitude}
        early={location.early ? true : false}
        fusion={location.fusion ? true : false}
      />
    ));
  };

  render() {
    const { locs = [], early = [], fusion = [] } = this.state;
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDQ1gQGmiYylOah3uNrPSCX0j31L_xsC4M" }}
          defaultCenter={{
            lat:
              locs.length > 0
                ? locs[0].latitude
                : early.length > 0
                ? early[0].latitude
                : fusion.length > 0
                ? fusion[0].latitude
                : 0,
            lng:
              locs.length > 0
                ? locs[0].longitude
                : early.length > 0
                ? early[0].longitude
                : fusion.length > 0
                ? fusion[0].longitude
                : 0,
          }}
          defaultZoom={this.props.zoom}
        >
          {this.populateLocations()}
        </GoogleMapReact>
      </div>
    );
  }
}
