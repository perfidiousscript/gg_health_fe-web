import React from "react";
import drawConstellations from "../../js/d3/constellation_script.js";

class Constellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locations: this.props.location.state.locations };
  }

  componentDidMount() {
    drawConstellations();
  }

  render() {
    const { locations } = this.state;
    return (
      <div>
        <h4>Constellation Here!</h4>
        <svg style={{ height: 300, width: 300 }}>
          <g />
        </svg>
      </div>
    );
  }
}

export default Constellation;
