import React, { useEffect } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import Locations from "./Components/LocationComponents/Locations.js";
import Location from "./Components/LocationComponents/Location.js";
import EditLocation from "./Components/LocationComponents/EditLocation.js";
import Constellation from "./Components/LocationComponents/Constellation.js";
import Practices from "./Components/PracticesComponents/Practices.tsx";
import EditPractice from "./Components/PracticesComponents/EditPractice.js";
import AddPractice from "./Components/PracticesComponents/AddPractice.tsx";
import SignIn from "./SignIn.js";
import AuthLink from "./AuthLink.js";
import ManagerDash from "./ManagerDash.js";
import { getUserProfile, logOutUser } from "./js/actions/user_actions.js";

const AuthenticatedRoute = ({ user, component, ...options }) => {
  const finalComponent = user.role ? component : SignIn;

  return <Route {...options} component={finalComponent} />;
};

const ManagerRoute = ({ user, component, ...options }) => {
  let finalComponent;

  if (user) {
    if (user.role === "manager") {
      finalComponent = component;
    } else {
      finalComponent = Home;
    }
  } else {
    finalComponent = SignIn;
  }
  return <Route {...options} component={finalComponent} />;
};

class App extends React.Component {
  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      if (localStorage.auth_token) {
        dispatch(getUserProfile());
      }
    }
  }

  logOut = () => {
    const { dispatch } = this.props;
    localStorage.setItem("auth_token", "");
    dispatch(logOutUser());
    this.props.history.push("/");
  };

  logIn = () => {
    this.props.history.push("/sign-in");
  };

  render() {
    const { user, isAuthenticated, isFetching, dispatch } = this.props;

    if (isFetching) {
      return <p>Loading...</p>;
    } else {
      return (
        <Router>
          <div className="App">
            <header
              className="App-header"
              style={{
                padding: "1.2em 0em",
                display: "block"
              }}
            >
              <Row>
                <Col md={{ offset: 4, span: 4 }}>
                  <Link to="/" style={{ fontSize: "2em", color: "aliceblue" }}>
                    Gentle Guide
                  </Link>
                </Col>
                <Col md={{ offset: 2, span: 2 }} style={{ display: "flex" }}>
                  <AuthLink
                    isAuthenticated={isAuthenticated}
                    logOut={this.logOut}
                    logIn={this.logIn}
                  />
                </Col>
              </Row>
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
              <ManagerRoute
                path="/manager-dashboard"
                component={ManagerDash}
                user={user}
              />
              <ManagerRoute
                path="/practices"
                component={Practices}
                user={user}
              />
              <ManagerRoute
                path="/edit-practice"
                component={EditPractice}
                user={user}
              />
              <ManagerRoute
                path="/add-practice"
                component={AddPractice}
                user={user}
              />
              <AuthenticatedRoute
                path="/edit-location"
                component={EditLocation}
                user={user}
              />
              <AuthenticatedRoute
                path="/constellation"
                component={Constellation}
                user={user}
              />
              <AuthenticatedRoute
                path="/locations"
                component={Locations}
                user={user}
              />
              <AuthenticatedRoute
                path="/location"
                component={Location}
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
