import React from "react";
import { connect } from "react-redux";

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
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { practices, isFetching } = state.practices;

  return { practices, isFetching };
}

export default connect(mapStateToProps)(AddPractice);
