import React from "react";
import Store from "./js/store/index.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ManagerDash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }
  render() {
    return (
      <div>
        <h3>Manager Dashboard!</h3>
        <Link to="/edit-locations">View/Edit Your Practice</Link>
        <p>View/Edit Your Locations</p>
        <p>View/Manage Your Practitioners</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locations } = state.locations;

  return { locations };
}

export default connect(mapStateToProps)(ManagerDash);
