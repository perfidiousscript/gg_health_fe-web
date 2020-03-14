import React from "react";
import { Formik } from "formik";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Sign Up</h4>
        <Formik>
          {props => (
            <form>
              <label for="firstName">First Name</label> <br />
              <input type="text" id="firstName" name="firstName" /> <br />
              <label for="lastName">Last Name</label> <br />
              <input type="text" id="lasttName" name="lastName" /> <br />
              <label for="emailAdress">Email Address</label> <br />
              <input type="text" id="emailAddress" name="emailAddress" />
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default SignUp;
