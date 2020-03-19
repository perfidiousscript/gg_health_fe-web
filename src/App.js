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
import { Button } from "react-bootstrap";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import Locations from "./Locations.js";
import SignIn from "./SignIn.js";
import { getUserProfile, logOutUser } from "./js/actions/user_actions.js";

function authLink(isAuthenticated) {
  return isAuthenticated ? (
    <Button variant="link" onClick={logOut()}>
      Sign Out
    </Button>
  ) : (
    <Link to="/sign-in">Sign In</Link>
  );
}

function logOut() {
  // localStorage.setItem("auth_token", "");
  // dispatch(logOut());
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      if (localStorage.auth_token) {
        dispatch(getUserProfile());
      }
    }
  }

  render() {
    const { user, isAuthenticated, isFetching } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    } else {
      return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to="/">Gentle Guide</Link>
              {authLink(isAuthenticated)}
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
  const { user, isFetching, isAuthenticated } = state.user;

  console.log("state in MStP: ", state);

  return { user, isFetching, isAuthenticated };
}

export default connect(mapStateToProps)(App);
