import React from "react";
import { connect } from "react-redux";

import StepOne from "./Components/SignUpComponents/StepOne.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, responseStatus, signUpStep } = this.props;
    let responseDisplay;
    if (!isFetching && responseStatus) {
      if (responseStatus === 201) {
        return <p>Success!</p>;
      } else {
        return <p>User creation error!</p>;
      }
    }
    switch (signUpStep) {
      case 1:
        return <StepOne />;
      default:
        return <StepOne />;
    }
  }
}

function mapStateToProps(state) {
  const { user, responseStatus, isFetching, signUpStep } = state.userReducer;

  return { user, responseStatus, isFetching, signUpStep };
}

export default connect(mapStateToProps)(SignUp);
