import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class AuthLink extends React.Component {
  logInRedirect() {
    this.props.history.push("/sign-in");
  }

  render() {
    const { isAuthenticated, logOut } = this.props;
    return isAuthenticated ? (
      <Button variant="link" onClick={logOut} style={{ color: "aliceblue" }}>
        Sign Out
      </Button>
    ) : (
      <Button
        variant="link"
        onClick={this.logInRedirect}
        style={{
          color: "aliceblue",
          borderLeft: "1px solid aliceblue",
          borderRadius: 0
        }}
      >
        Sign In
      </Button>
    );
  }
}

export default AuthLink;
