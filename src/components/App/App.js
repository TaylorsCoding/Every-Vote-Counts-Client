import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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

const API_KEY = "AIzaSyDDcrN66qx9l3Ytmox2fiYcGl_0HCcmuqw";

class App extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = { hasError: false };

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
          console.error(err);
        });
    }
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header />
        </header>
        <main className="App__main">
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
            <Route path={"/inforesults"} component={InfoResultsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
