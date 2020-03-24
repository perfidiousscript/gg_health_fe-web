import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

class AddPractice extends React.Component {
  render() {
    return (
      <div>
        <p>Practices are discrete business entities.</p>
        <p>
          Add a practice only if you have separate billing or contact
          information.
        </p>
        <p>
          If you want to add a locations under one business, go to 'Add
          Location'
        </p>
        <h4></h4>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: ""
          }}
          onSubmit={values => {
            // dispatch(createUser(values));
          }}
        ></Formik>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { practices, isFetching } = state.practices;

  return { practices, isFetching };
}

export default connect(mapStateToProps)(AddPractice);
