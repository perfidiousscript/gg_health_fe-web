import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { createUser } from "./js/actions/user_actions.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, responseStatus } = this.props;
    let responseDisplay;
    if (!isFetching && responseStatus) {
      if (responseStatus === 201) {
        return <p>Success!</p>;
      } else {
        return <p>User creation error!</p>;
      }
    }
    return (
      <div>
        <h4>Sign Up</h4>
        <Formik
          initialValues={{ firstName: "", lastName: "", emailAddress: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(createUser(values));
            }, 400);
          }}
        >
          {({ isSubmitting, isFetching, responseStatus, responseDisplay }) => (
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
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {responseDisplay}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, responseStatus, isFetching } = state.userReducer;

  return { user, responseStatus, isFetching };
}

export default connect(mapStateToProps)(SignUp);
