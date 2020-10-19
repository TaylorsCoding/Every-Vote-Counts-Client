import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";

import UserContext from "../../contexts/UserContext";

import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import GetInfoPage from "../GetInfoPage/GetInfoPage";
import InfoResultsPage from "../InfoResultsPage/InfoResultsPage";

import "./App.css";
import SavedAddressesPage from "../SavedAddressesPage/SavedAddressesPage";

const API_KEY = "AIzaSyDQ1gQGmiYylOah3uNrPSCX0j31L_xsC4M";

class App extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  loadGoogleApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.client.setApiKey(API_KEY);
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadGoogleApi();
    if (TokenService.hasAuthToken()) {
      AuthApiService.getUser(TokenService.getAuthToken())
        .then((res) => {
          this.context.setUser(res);
        })
        .catch((err) => {
          this.setState({ error: err });
        });
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-error-container">
          {this.state.error ? this.state.error.error : null}
        </div>
        <header className="app-header">
          <Header />
        </header>
        <main className="app-main">
          {this.state.hasError && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <Route exact path={"/"} component={HomePage} />
            <Route path={"/login"} component={LoginPage} />
            <Route path={"/register"} component={RegistrationPage} />
            <Route path={"/aboutus"} component={AboutUs} />
            <Route
              path={"/termsandconditions"}
              component={TermsAndConditions}
            />

            <Route path={"/getinfo"} component={GetInfoPage} />
            <Route path={"/savedaddresses"} component={SavedAddressesPage} />
            <Route path={"/inforesults"} component={InfoResultsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <footer>
          <Footer className="app-footer" />
        </footer>
      </div>
    );
  }
}

export default App;
