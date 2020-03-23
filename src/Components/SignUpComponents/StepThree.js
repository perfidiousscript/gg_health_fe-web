import React from "react";
import { connect } from "react-redux";

class StepThree extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <p>Step three!</p>
        <h3>User</h3>
        <p>First Name: {user.first_name}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.user;

  return { user };
}

export default connect(mapStateToProps)(StepThree);
