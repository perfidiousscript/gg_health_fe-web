import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <div>
        <h4>Sign Up</h4>
        <Formik
          initialValues={{ firstName: "", lastName: "", emailAddress: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {}, 400);
          }}
        >
          {props => (
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
              <p> </p>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.userReducer;

  return { user };
}

export default connect(mapStateToProps)(SignUp);
