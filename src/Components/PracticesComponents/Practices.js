import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPractices } from "../../js/actions/practice_actions.js";

class Practices extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPractices());
  }

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
    } else if (practices.length == 1) {
      const practice = practices[0];
      return (
        <div>
          <h3> Your Practice!</h3>
          <p>Name: {practice.name}</p>
          <Link to="/edit-practice">Edit Your Practice</Link>
        </div>
      );
    } else if (practices.length > 1) {
      return (
        <div>
          <h3>Whoa you have a bunch of practices!</h3>
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

export default connect(mapStateToProps)(Practices);
