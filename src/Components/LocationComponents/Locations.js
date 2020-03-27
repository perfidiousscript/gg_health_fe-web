import React from "react";
import Store from "../../js/store/index.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Col, Row, Button } from "react-bootstrap";

import PropTypes from "prop-types";

import { fetchLocations } from "../../js/actions/location_actions.js";

class Locations extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;

    let type;
    let practiceId;
    if (location.state) {
      type = location.state.type;
      practiceId = location.state.practice;
    }

    dispatch(fetchLocations(type, practiceId));
  }

  editButton(location) {
    const type = this.props.location.state.type;

    if (type == "practice") {
      return (
        <Col md={{ span: 2 }}>
          <Link to={{ pathname: "/edit-location", locationId: { location } }}>
            Edit Location
          </Link>
        </Col>
      );
    }
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
            <Col md={{ span: 2, offset: 2 }}>Name</Col>
            <Col md={{ span: 3 }}>Address</Col>
            <Col md={{ span: 2 }}>Services</Col>
          </Row>
          {locations.map((location, index) => (
            <Row key={index}>
              <Col md={{ span: 2, offset: 2 }}>{location.name}</Col>
              <Col md={{ span: 3 }}>{location.address}</Col>
              <Col md={{ span: 2 }}>{location.services.services}</Col>
              {this.editButton(location)}
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

// Locations.propTypes = {
//   locations: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired
// };

function mapStateToProps(state) {
  const { locations, user } = state.locations;

  return { locations, user };
}

export default connect(mapStateToProps)(Locations);
