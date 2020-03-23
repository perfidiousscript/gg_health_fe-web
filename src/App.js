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
import Locations from "./Components/LocationComponents/Locations.js";
import Practices from "./Components/PracticesComponents/Practices.js";
import PracticesEdit from "./Components/PracticesComponents/PracticesEdit.js";
import SignIn from "./SignIn.js";
import AuthLink from "./AuthLink.js";
import ManagerDash from "./ManagerDash.js";
import { getUserProfile, logOutUser } from "./js/actions/user_actions.js";

const PrivateRoute = ({ user, component, ...options }) => {
  const finalComponent = user ? component : SignIn;

  return <Route {...options} component={finalComponent} />;
};

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

  logOut = () => {
    const { dispatch, user } = this.props;
    localStorage.setItem("auth_token", "");
    dispatch(logOutUser());
  };

  render() {
    const { user, isAuthenticated, isFetching, dispatch } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    } else {
      return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to="/">Gentle Guide</Link>
              <AuthLink
                isAuthenticated={isAuthenticated}
                logOut={this.logOut}
              />
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
                path="/practices"
                component={Practices}
                user={user}
              />
              <PrivateRoute
                path="/edit-practices"
                component={PracticesEdit}
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
