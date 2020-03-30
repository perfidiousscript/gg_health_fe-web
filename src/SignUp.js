import React from "react";
import { connect } from "react-redux";

import StepOne from "./Components/SignUpComponents/StepOne.js";
import StepTwo from "./Components/SignUpComponents/StepTwo.js";
import StepThree from "./Components/SignUpComponents/StepThree.js";
import StepFour from "./Components/SignUpComponents/StepFour.js";
import StepFinal from "./Components/SignUpComponents/StepFinal.js";
import AddPractice from "./Components/PracticesComponents/AddPractice.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, isFetching, responseStatus, signUpStep } = this.props;
    let responseDisplay;
    switch (signUpStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <AddPractice />;
      case 4:
        return <StepFinal />;
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
