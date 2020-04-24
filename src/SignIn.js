import React from "react";
import Store from "./js/store/index.js";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import fetch from "cross-fetch";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { authenticateUser } from "./js/actions/user_actions.js";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, user, error, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else if (error) {
      return <p>{error.user_authentication}</p>;
    } else {
      return (
        <div>
          <h4>Sign In</h4>
          <Formik
            initialValues={{ password: "", emailAddress: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                dispatch(authenticateUser(values));
              }, 400);
            }}
          >
            {({ isSubmitting, isFetching, responseStatus, user }) => (
              <Form>
                <label htmlFor="emailAddress">Email Address</label>
                <br />
                <Field type="text" name="emailAddress" /> <br />
                <label htmlFor="password">Password</label>
                <br />
                <Field type="text" name="password" /> <br />
                <br />
                <p> </p>
                <Button variant="secondary" disabled={isSubmitting}>
                  Submit
                </Button>
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
