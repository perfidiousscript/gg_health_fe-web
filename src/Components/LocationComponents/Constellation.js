import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Col, Row, Button } from "react-bootstrap";

class Constellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locations: this.props.location.state.locations };
  }
  drawShapes(locations) {}
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
        {this.drawShapes(locations)}
      </div>
    );
  }
}

export default Constellation;
