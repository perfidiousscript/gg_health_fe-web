import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class AuthLink extends React.Component {
  render() {
    const { isAuthenticated, logOut } = this.props;
    return isAuthenticated ? (
      <Button variant="link" onClick={logOut}>
        Sign Out
      </Button>
    ) : (
      <Link to="/sign-in">Sign In</Link>
    );
  }
}

export default AuthLink;
