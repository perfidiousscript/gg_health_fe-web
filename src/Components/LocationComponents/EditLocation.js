import React from "react";
import Store from "../../js/store/index.js";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Container, Col, Row, Button } from "react-bootstrap";

import PropTypes from "prop-types";

class EditLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { location: this.props.location.state.location };
  }

  servicesRows() {
    return (
      <Row>
        <Col>Services Here!</Col>
      </Row>
    );
  }

  render() {
    const { dispatch, isFetching } = this.props;
    const { location } = this.state.location;

    return (
      <div>
        <h4>Edit Location!</h4>
        <Formik
          initialValues={{
            name: location.name,
            address: location.address,
            phone_number: location.phone_number
          }}
          onSubmit={values => {
            // dispatch(editLocation(values));
          }}
        >
          {({ isFetching, responseStatus }) => (
            <Form>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="name">Location Name</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="name" /> <br />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="name">Address </label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="address" /> <br />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="name">Phone Number</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="phone_number" /> <br />
                </Col>
              </Row>
              {this.servicesRows()}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default EditLocation;
