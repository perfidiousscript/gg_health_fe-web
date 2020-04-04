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

        <svg style={{ width: "700", height: "700" }}>
          <g transform="translate(20, 10)" />
        </svg>
      </div>
    );
  }
}

export default Constellation;
