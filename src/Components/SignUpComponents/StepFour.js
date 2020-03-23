import React from "react";
import { connect } from "react-redux";

class StepFour extends React.Component {
  render() {
    return <h3>Step Four!</h3>;
  }
}

function mapStateToProps(state) {
  const { user } = state.user;

  return { user };
}

export default connect(mapStateToProps)(StepFour);
