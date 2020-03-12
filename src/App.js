import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import Locations from "./Locations.js";

function App() {
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

export default App;
