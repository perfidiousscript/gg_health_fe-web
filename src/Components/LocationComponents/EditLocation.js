import React from "react";
import Store from "../../js/store/index.js";
import Calendar from "react-calendar";
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
        <Col md={{ span: 2, offset: 2 }}>Services Here!</Col>
      </Row>
    );
  }

  render() {
    const { dispatch, isFetching } = this.props;
    const { location } = this.state.location;

    return (
      <div>
        <h4>Edit Location!</h4>
        <Row>
          <Col md={{ span: 2, offset: 1 }}>
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
                    <Col>
                      <label for="name">Location Name</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field type="text" name="name" /> <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label for="name">Address </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field type="text" name="address" /> <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label for="name">Phone Number</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field type="text" name="phone_number" /> <br />
                    </Col>
                  </Row>
                  {this.servicesRows()}
                </Form>
              )}
            </Formik>
          </Col>
          <Col md={{ span: 8 }}>
            <Calendar />
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditLocation;
