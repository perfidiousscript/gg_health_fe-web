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
    if (this.props.location.state) {
      const type = this.props.location.state.type;

      if (type == "practice") {
        return (
          <Col md={{ span: 2 }}>
            <Link
              to={{
                pathname: "/edit-location",
                state: { location: { location } }
              }}
            >
              Edit Location
            </Link>
          </Col>
        );
      }
    }
  }

  renderHelper() {
    const { locations } = this.props;

    if (!locations[0]) {
      return <p>"Loading..."</p>;
    } else {
      // groupLocations();
      return (
        <div>
          <h1>Locations</h1>
          <Container className="locations">
            <Row>
              <Col md={{ span: 3, offset: 2 }}>
                <u>Name</u>
              </Col>
              <Col md={{ span: 3 }}>
                <u>Address</u>
              </Col>
              <Col md={{ span: 2 }}>
                <u>Services</u>
              </Col>
            </Row>
            {locations.map((location, index) => (
              <Row key={index}>
                <Col md={{ span: 3, offset: 2 }}>{location.name}</Col>
                <Col md={{ span: 3 }}>{location.address}</Col>
                <Col md={{ span: 2 }}>{location.services.primary_service}</Col>
                {this.editButton(location)}
              </Row>
            ))}
          </Container>
        </div>
      );
    }
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
  const { locations } = state.locations;

  return { locations };
}

export default connect(mapStateToProps)(Locations);
