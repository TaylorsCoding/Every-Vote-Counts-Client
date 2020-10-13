import React, { Component } from "react";

import MapMarker from "./mapmarker.png";

import "./Location.css";

export default class Location extends Component {
  handleClick = (event) => {
    if (!event.target.parentElement.lastChild.matches(".marker-information")) {
      const information = document.createElement("div");
      information.className = "marker-information";

      const name = document.createElement("h3");
      const nameText = document.createTextNode(this.props.name);
      name.appendChild(nameText);

      const address = document.createElement("p");
      const addressStreet = document.createTextNode(this.props.street);
      const addressCity = document.createTextNode(this.props.city);
      const addressZipCode = document.createTextNode(this.props.zipCode);

      address.appendChild(addressStreet);
      address.appendChild(document.createElement("br"));
      address.appendChild(addressCity);
      address.appendChild(document.createElement("br"));
      address.appendChild(addressZipCode);

      const pollingHours = document.createElement("ul");
      if (this.props.pollingHours) {
        const alteredPollingHoursString = this.props.pollingHours.replaceAll(
          "pm ",
          "pm\n"
        );
        const hours = alteredPollingHoursString.split("\n");
        for (let i = 0; i < hours.length; i++) {
          const hour = document.createElement("li");
          const hourText = document.createTextNode(hours[i]);
          hour.appendChild(hourText);
          pollingHours.appendChild(hour);
        }
      }

      const start = document.createElement("p");
      const startText = document.createTextNode(`Start: ${this.props.start}`);
      start.appendChild(startText);

      const end = document.createElement("p");
      const endText = document.createTextNode(`End: ${this.props.end}`);
      end.appendChild(endText);

      information.appendChild(name);
      information.appendChild(address);
      if (this.props.pollingHours) {
        information.appendChild(pollingHours);
      }
      if (this.props.start) {
        information.appendChild(start);
      }
      if (this.props.end) {
        information.appendChild(end);
      }

      event.target.parentElement.appendChild(information);
    } else {
      event.target.parentElement.removeChild(
        event.target.parentElement.childNodes[1]
      );
    }
  };

  render() {
    return (
      <div>
        <img src={MapMarker} onClick={this.handleClick} />
      </div>
    );
  }
}
