import React from "react";
import Store from "./js/store/index.js";
import { Container, Col, Row } from "react-bootstrap";

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      locations: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    var store = Store.getState();
    this.setState({
      user: store.user,
      locations: store.locations,
      isLoaded: true
    });

    // Store.subscribe(() => {
    //   console.log("Store: ", Store.getState());
    // });
  }

  renderHelper() {
    const data = this.state;
    if (!data.locations[0]) {
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
          {this.state.locations.map((location, index) => (
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

export default Locations;
