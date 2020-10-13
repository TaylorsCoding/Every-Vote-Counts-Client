import React, { Component } from "react";

const UserContext = React.createContext({
  currentUser: {},
  setUser: () => {},
  hasUser: () => {},
  clearUser: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  state = {
    currentUser: {},
  };

  setUser = (user) => {
    this.setState({
      currentUser: user,
    });
  };

  hasUser = () => {
    return this.state.currentUser !== {};
  };

  clearUser = () => {
    this.setState({
      currentUser: {},
    });
  };

  render() {
    const value = {
      currentUser: this.state.currentUser,
      setUser: this.setUser,
      hasUser: this.hasUser,
      clearUser: this.clearUser,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
