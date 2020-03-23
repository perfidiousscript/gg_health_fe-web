import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  authRender(isAuthenticated, user) {
    if (isAuthenticated && user.role === "manager") {
      return (
        <div>
          <div> Manager Logged in!</div>
          <Link
            to={{
              pathname: "/manager-dashboard",
              state: { user: user, isAuthenticated: isAuthenticated }
            }}
          >
            View Your Dashboard
          </Link>
        </div>
      );
    } else if (isAuthenticated) {
      return <div>Logged in!</div>;
    } else {
      return (
        <div>
          <p>Home Screen</p>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      );
    }
  }

  render() {
    const { isAuthenticated, user } = this.props;
    return this.authRender(isAuthenticated, user);
  }
}

export default Home;
