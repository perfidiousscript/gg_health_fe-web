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
import ManagerDash from "./ManagerDash.js";
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

const PrivateRoute = ({ user, component, ...options }) => {
  const finalComponent = user ? component : SignIn;

  return <Route {...options} component={finalComponent} />;
};

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
                <Home isAuthenticated={isAuthenticated} user={user} />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <PrivateRoute
                path="/manager-dashboard"
                component={ManagerDash}
                user={user}
              />
              <PrivateRoute
                path="/locations"
                component={Locations}
                user={user}
              />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

function mapStateToProps(state) {
  const { user, isFetching, isAuthenticated } = state.user;

  return { user, isFetching, isAuthenticated };
}

export default connect(mapStateToProps)(App);
