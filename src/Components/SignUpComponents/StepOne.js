import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { createUser } from "../../js/actions/user_actions.js";

class StepOne extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching } = this.props;
    return (
      <div>
        <h4>Sign Up</h4>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: ""
          }}
          onSubmit={values => {
            dispatch(createUser(values));
          }}
        >
          {({ isSubmitting, isFetching, responseStatus }) => (
            <Form>
              <label for="firstName">First Name</label>
              <br />
              <Field type="text" name="firstName" /> <br />
              <label for="lastName">Last Name</label>
              <br />
              <Field type="text" name="lastName" /> <br />
              <label for="emailAddress">Email Address</label>
              <br />
              <Field type="text" name="emailAddress" /> <br />
              <label for="password">Password</label>
              <br />
              <Field type="text" name="password" /> <br />
              <br />
              <p> </p>
              <button type="submit" disabled={isSubmitting}>
                Next
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, responseStatus, isFetching, signUpStep } = state.user;

  return { user, responseStatus, isFetching, signUpStep };
}

export default connect(mapStateToProps)(StepOne);
