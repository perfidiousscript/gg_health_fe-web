import React from "react";
import Store from "./js/store/index.js";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

import PropTypes from "prop-types";

import { fetchLocations } from "./js/actions/location_actions.js";

class Locations extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLocations());
  }

  renderHelper() {
    const { locations } = this.props;
    if (!locations[0]) {
      return <p>"Loading..."</p>;
    }
    return (
      <div>
        <h1>Locations</h1>
        <Container className="locations">
          <Row>
            <Col> </Col>
            <Col>Name</Col>
            <Col>Address</Col>
            <Col>Services</Col>
            <Col> </Col>
          </Row>
          {locations.map((location, index) => (
            <Row key={index}>
              <Col> </Col>
              <Col>{location.name}</Col>
              <Col>{location.address}</Col>
              <Col>{location.services.services}</Col>
              <Col> </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }

  render() {
    return <div>{this.renderHelper()}</div>;
  }
}

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { locations } = state.locationsReducer;

  return { locations };
}

export default connect(mapStateToProps)(Locations);
