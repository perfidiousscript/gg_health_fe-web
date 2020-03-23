import React from "react";
import Store from "./js/store/index.js";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import fetch from "cross-fetch";
import { Link } from "react-router-dom";

import { authenticateUser } from "./js/actions/user_actions.js";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, user, error, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <div>
          <p>Welcome {user.first_name}!</p>
          <br />
          <Link
            to={{
              pathname: "/locations",
              state: { user: user, isAuthenticated: isAuthenticated }
            }}
          >
            View Locations
          </Link>
          <br />
        </div>
      );
    } else if (error) {
      return <p>{error.user_authentication}</p>;
    } else {
      return (
        <div>
          <h4>Sign In</h4>
          <Formik
            initialValues={{ firstName: "", emailAddress: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                dispatch(authenticateUser(values));
              }, 400);
            }}
          >
            {({ isSubmitting, isFetching, responseStatus, user }) => (
              <Form>
                <label for="emailAddress">Email Address</label>
                <br />
                <Field type="text" name="emailAddress" /> <br />
                <label for="password">Password</label>
                <br />
                <Field type="text" name="password" /> <br />
                <br />
                <p> </p>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const {
    user,
    responseStatus,
    isFetching,
    error,
    isAuthenticated
  } = state.user;

  return { user, responseStatus, isFetching, error, isAuthenticated };
}

export default connect(mapStateToProps)(SignIn);
