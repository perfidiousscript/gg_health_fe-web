import React from "react";
import { connect } from "react-redux";

class EditPractice extends React.Component {
  renderHelper() {
    const { isFetching, practices } = this.props;
    if (isFetching) {
      return <h3>Loading...</h3>;
    } else if (!practices) {
      return (
        <div>
          <h3> No Practices Yet!</h3>
          <h3> Add your Practice!</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3> Edit your Practice!</h3>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderHelper()}</div>;
  }
}

function mapStateToProps(state) {
  const { practices, isFetching } = state.practices;

  return { practices, isFetching };
}

export default connect(mapStateToProps)(EditPractice);
