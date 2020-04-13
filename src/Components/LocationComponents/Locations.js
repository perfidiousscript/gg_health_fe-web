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

  renderLocations(locations) {
    let constructedLocations = [];
    let superIndex = 1;

    for (const group in locations) {
      locations[group]["locations"].map(location => {
        superIndex++;
        constructedLocations.push(
          <Row key={superIndex}>
            <Col md={{ span: 3, offset: 2 }}>
              <Link
                to={{
                  pathname: "/location",
                  state: { location: location }
                }}
              >
                {location.name}
              </Link>
            </Col>
            <Col md={{ span: 3 }}>{location.address}</Col>
            <Col md={{ span: 2 }}>{location.services.primary_service}</Col>
            {this.editButton(location)}
          </Row>
        );
      });
    }
    return constructedLocations;
  }

  renderHelper(locations) {
    const { isFetching } = this.props;

    if (!isFetching & locations) {
      return <p>"Loading..."</p>;
    } else {
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
            {this.renderLocations(locations)}
          </Container>
        </div>
      );
    }
  }

  render() {
    const { locations } = this.props;
    return (
      <div>
        <Link
          to={{
            pathname: "/constellation",
            state: { locations: locations }
          }}
        >
          View Constellation!
        </Link>
        <br />
        {this.renderHelper(locations)}
      </div>
    );
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
