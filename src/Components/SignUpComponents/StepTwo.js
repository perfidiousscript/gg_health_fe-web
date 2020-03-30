import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { updateUser } from "../../js/actions/user_actions.js";

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isSubmitting } = this.props;
    return (
      <div>
        <h4>Sign Up</h4>
        <p>Step two!</p>
        <Formik
          initialValues={{
            role: "consumer"
          }}
          onSubmit={values => {
            let nextStep;
            if (values.role === "consumer") {
              nextStep = 4;
            } else {
              nextStep = 3;
            }
            dispatch(updateUser(values, nextStep));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <br />
              <Field as="select" name="role">
                <option value="" label="Select your role" />
                <option value="consumer" label="consumer" />
                <option value="manager" label="manager" />
                <option value="practitioner" label="practitioner" />
              </Field>
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
  const { user, responseStatus, isFetching } = state.user;

  return { user, responseStatus, isFetching };
}

export default connect(mapStateToProps)(StepTwo);
