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
  render() {
    console.log(this.props.locs);
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDQ1gQGmiYylOah3uNrPSCX0j31L_xsC4M" }}
          defaultCenter={{
            lat: this.props.locs ? this.props.locs[0].latitude : 0,
            lng: this.props.locs ? this.props.locs[0].longitude : 0,
          }}
          defaultZoom={this.props.zoom}
        >
          {this.props.locs
            ? this.props.locs.map((location, idx) => (
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
                />
              ))
            : null}
        </GoogleMapReact>
      </div>
    );
  }
}
