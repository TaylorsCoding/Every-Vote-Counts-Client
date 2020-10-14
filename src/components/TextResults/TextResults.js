import React from "react";
import { NavLink } from "react-router-dom";

import "./TextResults.css";

export default function TextResults(props) {
  return (
    <div className="tr-container">
      {props.locations ? null : props.address.line1 ||
        props.address.city ||
        props.address.state ||
        props.address.zip ? (
        <h3 className="tr-error">Oops! We had trouble finding locations.</h3>
      ) : (
        <h3>Oops! Looks like no information at all is available.</h3>
      )}
      {props.address ? (
        props.address.line1 ||
        props.address.city ||
        props.address.state ||
        props.address.zip ? (
          <div>
            <p className="tr-address">
              {props.address.line1 ? `${props.address.line1}, ` : null}
              {props.address.city ? `${props.address.city}, ` : null}
              {props.address.state ? `${props.address.state} ` : null}
              {props.address.zip ? `${props.address.zip}` : null}
            </p>

            <h2>Voting Information</h2>
            {props.urls.electionInfoUrl ? (
              <p>
                <a href={props.urls.electionInfoUrl}>Election Info</a>
              </p>
            ) : null}

            {props.urls.electionRegistrationConfirmationUrl ? (
              <p>
                <a href={props.urls.electionRegistrationConfirmationUrl}>
                  Check if you're registered to vote!
                </a>
              </p>
            ) : null}
            {props.urls.electionRegistrationUrl ? (
              <p>
                <a href={props.urls.electionRegistrationUrl}>
                  Register to vote now!
                </a>
              </p>
            ) : null}
            {props.urls.electionRulesUrl ? (
              <p>
                <a href={props.urls.electionRulesUrl}>Election Rules</a>
              </p>
            ) : null}
            {props.urls.ballotInfoUrl ? (
              <p>
                <a href={props.urls.ballotInfoUrl}>Ballot Info</a>
              </p>
            ) : null}
            {props.urls.votingLocationFinderUrl ? (
              <p>
                <a href={props.urls.votingLocationFinderUrl}>
                  Find a Location on the State Website
                </a>
              </p>
            ) : null}
            {props.urls.absenteeVotingInfoUrl ? (
              <p>
                <a href={props.urls.absenteeVotingInfoUrl}>
                  Absentee Voting Info
                </a>
              </p>
            ) : null}
          </div>
        ) : null
      ) : null}
      <NavLink to="/getinfo">
        <button className="tr-retry-button">
          Try again with another address!
        </button>
      </NavLink>
    </div>
  );
}
