import React from "react";
import Store from "./js/store/index.js";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import fetch from "cross-fetch";

import { authenticateUser } from "./js/actions/user_actions.js";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, user, jwt } = this.props;
    console.log("Props in comp: ", this.props);
    let responseDisplay;
    if (!isFetching && user.first_name) {
      if (user.first_name) {
        return <p>Welcome {user.first_name}!</p>;
      } else {
        return <p>User creation error!</p>;
      }
    }
    return (
      <div>
        <h4>Sign Up</h4>
        <Formik
          initialValues={{ firstName: "", emailAddress: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(authenticateUser(values));
            }, 400);
          }}
        >
          {({ isSubmitting, isFetching, responseStatus, responseDisplay }) => (
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
        {responseDisplay}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, responseStatus, isFetching } = state.userReducer;

  return { user, responseStatus, isFetching };
}

export default connect(mapStateToProps)(SignIn);
