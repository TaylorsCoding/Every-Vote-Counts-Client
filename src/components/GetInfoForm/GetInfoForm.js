import React, { Component } from "react";

export default class GetInfoForm extends Component {
  static defaultProps = {};

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const address = `${ev.target["info-street"].value}. ${ev.target["info-city"].value} ${ev.target["info-state"].value} ${ev.target["info-zip-code"].value}`;
    var req = window.gapi.client.request({
      path: "/civicinfo/v2/voterinfo",
      params: {
        electionId: 7000,
        address: address,
      },
    });
    req.execute((response, rawResponse) => {
      window.localStorage.setItem(
        "dropOffLocations",
        JSON.stringify(response.dropOffLocations)
      );
      window.localStorage.setItem(
        "earlySites",
        JSON.stringify(response.earlyVoteSites)
      );
      window.localStorage.setItem(
        "address",
        JSON.stringify(response.normalizedInput)
      );
      window.localStorage.setItem(
        "votingUrls",
        JSON.stringify(response.state[0].electionAdministrationBody)
      );

      this.props.onGetInfoSuccess();
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="info-street">Street Address</label>
          <input type="text" name="info-street" id="info-street" />
        </fieldset>
        <fieldset>
          <label htmlFor="info-city">City</label>
          <input type="text" name="info-city" />
        </fieldset>
        <fieldset>
          <label htmlFor="info-state">State</label>
          <input type="text" name="info-state" />
        </fieldset>
        <fieldset>
          <label htmlFor="info-zip-code">Zip Code</label>
          <input type="text" name="info-zip-code" />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
