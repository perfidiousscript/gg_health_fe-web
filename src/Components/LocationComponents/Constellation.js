import React from "react";
import drawConstellations from "../../js/d3/constellation_script.js";

class Constellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locations: this.props.location.state.locations };
  }

  render() {
    const { locations } = this.state;

    return (
      <div>
        <h4>Constellation Here!</h4>
        <svg
          className="line-container"
          xmlns="http://www.w3.org/2000/svg"
          width="600" //{this.props.width}
          height="600" //{this.props.height}
          style={{
            backgroundColor: "indigo",
            borderWidth: "thin",
            borderColor: "yellow",
            borderRadius: "50%"
          }}
        ></svg>
        {drawConstellations(locations)}
      </div>
    );
  }
}

export default Constellation;
