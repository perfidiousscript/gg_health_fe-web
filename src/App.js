import React, { useEffect } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import Locations from "./Locations.js";
import SignIn from "./SignIn.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (!user) {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //   }
    // }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <p>Gentle Guide</p>
          </header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/locations">
              <Locations />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.userReducer;

  return { user };
}

export default connect(mapStateToProps)(App);
