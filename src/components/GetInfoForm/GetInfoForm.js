import React, { Component } from "react";

import "./GetInfoForm.css";

export default class GetInfoForm extends Component {
  static defaultProps = {};

  state = {
    error: null,
    streetVer: true,
    streetFormatVer: true,
    elseVer: true,
    zipVer: true,
    stateVer: true,
    cityVer: true,
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    window.localStorage.removeItem("dropOffLocations");
    window.localStorage.removeItem("earlySites");
    window.localStorage.removeItem("address");
    window.localStorage.removeItem("votingUrls");

    const zipRegex = RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
    const cityRegex = RegExp(
      "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$"
    );
    const stateRegex = RegExp(
      "^(([Aa][EeLlKkSsZzRr])|([Cc][AaOoTt])|([Dd][EeCc])|([Ff][MmLl])|([Gg][AaUu])|([Hh][Ii])|([Ii][DdLlNnAa])|([Kk][SsYy])|([Ll][Aa])|([Mm][EeHhDdAaIiNnSsOoTt])|([Nn][EeVvHhJjMmYyCcDd])|([Mm][Pp])|([Oo][HhKkRr])|([Pp][WwAaRr])|([Rr][Ii])|([Ss][CcDd])|([Tt][NnXx])|([Uu][Tt])|([Vv][TtIiAa])|([Ww][AaVvIiYy]))$"
    );
    const streetRegex = RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");

    const street = `${ev.target["info-street"].value}`;
    const city = ev.target["info-city"].value;
    const state = ev.target["info-state"].value;
    const zip = ev.target["info-zip-code"].value;

    let address = "";

    if (
      street.length === 0 &&
      (city.length === 0 || state.length === 0 || zip === 0)
    ) {
      this.setState({ streetVer: false });
      return;
    } else if (
      street.length > 0 &&
      (city.length === 0 || state.length === 0 || zip === 0)
    ) {
      this.setState({ elseVer: false });
      return;
    } else {
      if (zip.length > 0) {
        if (!zipRegex.test(zip)) {
          this.setState({ zipVer: false });
          return;
        }
      }
      if (city.length > 0) {
        if (!cityRegex.test(city)) {
          this.setState({ cityVer: false });
          return;
        }
      }
      if (street.length > 0) {
        if (!streetRegex.test(zip)) {
          this.setState({ streetFormatVer: false });
          return;
        }
      }
      if (state.length > 0) {
        if (!stateRegex.test(zip)) {
          this.setState({ stateVer: false });
          return;
        }
      }
      address = `${`${street}, `}${city.length > 0 ? `${city}, ` : null}${
        state.length > 0 ? `${state}, ` : null
      }${zip.length > 0 ? `${zip}` : null}`;
    }

    address = `${street}, ${city}, ${state}, ${zip}`;

    var req = window.gapi.client.request({
      path: "/civicinfo/v2/voterinfo",
      params: {
        electionId: 7000,
        address: address,
      },
    });
    req.execute((response, rawResponse) => {
      console.log(response);
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

  render() {
    return (
      <div className="gif-component">
        <div className="gif-error-row">
          <p className="gif-error-text">
            {this.state.streetVer
              ? null
              : "You must enter a street name and house number."}
            {this.state.elseVer
              ? null
              : "In addition to the street, add one more - preferably the zip-code."}
            {this.state.zipVer
              ? null
              : "The zip-code you entered is not valid."}
            {this.state.streetFormatVer
              ? null
              : "You have included characters in the street address that are not valid."}
            {this.state.stateVer
              ? null
              : "Please enter the state in a two letter format eg. VA, CA, or TX."}
            {this.state.cityVer ? null : "You have entered."}
          </p>
        </div>
        <form className="gif-form" onSubmit={this.handleSubmit}>
          <fieldset className="gif-fieldset">
            <div className="gif-label-container">
              <label className="gif-label" htmlFor="info-street">
                Street Address
              </label>
            </div>
            <div>
              <input
                className="gif-input"
                type="text"
                name="info-street"
                id="info-street"
                placeholder="4110 Chain Bridge Rd"
              />
            </div>
          </fieldset>
          <fieldset className="gif-fieldset">
            <div className="gif-label-container">
              <label className="gif-label" htmlFor="info-city">
                City
              </label>
            </div>
            <div>
              <input
                className="gif-input"
                type="text"
                name="info-city"
                placeholder="Fairfax"
              />
            </div>
          </fieldset>
          <fieldset className="gif-fieldset">
            <div className="gif-label-container">
              <label className="gif-label" htmlFor="info-state">
                State
              </label>
            </div>
            <div>
              <input
                className="gif-input"
                type="text"
                name="info-state"
                placeholder="VA"
              />
            </div>
          </fieldset>
          <fieldset className="gif-fieldset">
            <div className="gif-label-container">
              <label className="gif-label" htmlFor="info-zip-code">
                Zip Code
              </label>
            </div>
            <div>
              <input
                className="gif-input"
                type="text"
                name="info-zip-code"
                placeholder="22030"
              />
            </div>
          </fieldset>
          <input className="gif-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
