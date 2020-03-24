import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { createPractice } from "../../js/actions/practice_actions.js";

class AddPractice extends React.Component {
  render() {
    const { user, dispatch } = this.props;
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
        // name: string, contact: jsonb, user_id: integer, staff: text
        <Formik
          initialValues={{
            name: "",
            contact: {},
            userId: user.id,
            staff: `[${user.id}]`
          }}
          onSubmit={values => {
            dispatch(createPractice(values));
          }}
        ></Formik>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { practices, isFetching } = state.practices;
  const { user } = state.user;

  return { user, practices, isFetching };
}

export default connect(mapStateToProps)(AddPractice);
