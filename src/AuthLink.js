import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class AuthLink extends React.Component {
  buttonHover = () => {
    console.log("hovering!");
  };

  render() {
    const { isAuthenticated, logOut, logIn } = this.props;

    let link;
    let linkText;

    if (isAuthenticated) {
      link = logOut;
      linkText = "Sign Out";
    } else {
      link = logIn;
      linkText = "Sign In";
    }

    return (
      <div
        onClick={link}
        // onHover={this.buttonHover}
        style={{
          color: "aliceblue",
          borderLeft: "1px solid aliceblue",
          borderRadius: 0,
          width: "100%",
          padding: "7% 0 0 0"
        }}
      >
        {linkText}
      </div>
    );
  }
}

export default AuthLink;
