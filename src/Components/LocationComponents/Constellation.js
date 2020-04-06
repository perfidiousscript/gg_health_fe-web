import React from "react";
import drawConstellations from "../../js/d3/constellation_script.js";

class Constellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locations: this.props.location.state.locations };
  }

  componentDidMount() {
    const { locations } = this.state;
    drawConstellations(locations);
  }

  render() {
    return (
      <div>
        <h4>Constellation Here!</h4>
        <d3body />
      </div>
    );
  }
}

export default Constellation;
