import React from "react";
import { connect } from "react-redux";
import drawConstellations from "../../js/d3/constellation_script.js";
import { fetchLocations } from "../../js/actions/location_actions.js";

class Constellation extends React.Component {
  componentDidMount() {
    const { dispatch, locations, location } = this.props;

    let type;
    let practiceId;
    if (location.state) {
      type = location.state.type;
      practiceId = location.state.practice;
    }

    if (Object.keys(locations) == 0) {
      dispatch(fetchLocations(type, practiceId));
    }
  }

  render() {
    const { isFetching, locations } = this.props;

    if (isFetching & (Object.keys(locations) == 0)) {
      return <p>"Loading..."</p>;
    } else {
      drawConstellations(locations, this);
      return (
        <div>
          <h4>Constellation Here!</h4>
          <div id="d3Body" style={{ display: "inline-block" }} />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { locations, isFetching } = state.locations;

  return { locations };
}

export default connect(mapStateToProps)(Constellation);
