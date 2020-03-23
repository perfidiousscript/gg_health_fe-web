import React from "react";
import { connect } from "react-redux";

class LocationsEdit extends React.Component {
  render() {
    return (
      <div>
        <h3> Edit your Locations!</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locations, user } = state.locations;

  return { locations, user };
}

export default connect(mapStateToProps)(LocationsEdit);
