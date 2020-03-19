import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Home Screen</p>
        <Link to="/sign-up">Sign Up</Link>
        <span> </span>
        <Link to="/sign-in">Sign In</Link>
      </div>
    );
  }
}

export default Home;
