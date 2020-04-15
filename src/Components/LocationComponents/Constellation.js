import React from "react";
import * as d3 from "d3";
import drawConstellations from "../../js/d3/constellation_script.js";

class Constellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locations: this.props.location.state.locations };
  }

  componentDidMount() {
    const { locations } = this.state;
    drawConstellations(locations, this);
  }

  render() {
    return (
      <div>
        <h4>Constellation Here!</h4>
        <div id="d3Body" style={{ display: "inline-block" }} />
      </div>
    );
  }
}

export default Constellation;
