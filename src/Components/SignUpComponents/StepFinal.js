import React from "react";
import { connect } from "react-redux";

class StepFinal extends React.Component {
  render() {
    return <h3>All done!</h3>;
  }
}

function mapStateToProps(state) {
  const { user } = state.user;

  return { user };
}

export default connect(mapStateToProps)(StepFinal);
