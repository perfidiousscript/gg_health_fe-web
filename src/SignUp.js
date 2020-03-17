import React from "react";
import { connect } from "react-redux";

import StepOne from "./Components/SignUpComponents/StepOne.js";
import StepTwo from "./Components/SignUpComponents/StepTwo.js";
import StepThree from "./Components/SignUpComponents/StepThree.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, responseStatus, signUpStep } = this.props;
    let responseDisplay;
    // if (signUpStep === 3) {
    //   if (responseStatus === 201) {
    //     return <p>Success!</p>;
    //   } else {
    //     return <p>User creation error!</p>;
    //   }
    // }
    switch (signUpStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  }
}

function mapStateToProps(state) {
  const { user, responseStatus, isFetching, signUpStep } = state.user;

  return { user, responseStatus, isFetching, signUpStep };
}

export default connect(mapStateToProps)(SignUp);
