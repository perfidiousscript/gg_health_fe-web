import React from "react";
import Store from "./js/store/index.js";
import { connect } from "react-redux";

class ManagerDash extends React.Component {
  render() {
    return <h3>Manager Dashboard!</h3>;
  }
}

function mapStateToProps(state) {
  const { locations } = state.locations;

  return { locations };
}

export default connect(mapStateToProps)(ManagerDash);
