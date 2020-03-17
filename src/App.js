import React, { useEffect } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import Locations from "./Locations.js";
import SignIn from "./SignIn.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, isAuthenticated } = this.props;
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
            <PrivateRoute
              to="/locations"
              user={user}
              isAuthenticated={isAuthenticated}
            >
              <Locations />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ user, isAuthenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  const { user, isAuthenticated } = state.userReducer;

  return { user, isAuthenticated };
}

export default connect(mapStateToProps)(App);
