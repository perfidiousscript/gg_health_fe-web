import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { createPractice } from "../../js/actions/practice_actions.js";

class AddPractice extends React.Component {
  render() {
    const { user, dispatch, isFetching } = this.props;
    return (
      <div>
        <p>Practices are discrete business entities.</p>
        <p>
          Add a practice only if you need to have separate billing or contact
          information.
        </p>
        <p>
          If you want to add a new location under the same business, go to{" "}
          <Link to="add-location">Add Location</Link>
        </p>
        <Formik
          initialValues={{
            name: "",
            contact: {},
            userId: user.id,
            staff: ""
          }}
          onSubmit={values => {
            values.staff.push(user.id);
            dispatch(createPractice(values));
          }}
        >
          {({ isFetching, responseStatus }) => (
            <Form>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="name">Practice Name</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="name" /> <br />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="name">Contact Type</label>
                </Col>
                <Col md={{ span: 2 }}>
                  <label for="contactType">Contact Info</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="contactType" />
                </Col>
                <Col md={{ span: 2 }}>
                  <Field type="text" name="contactInfo" />
                </Col>
                <Col md={{ span: 2 }}>
                  <button type="addContact">Add Contact</button>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="staff">Staff</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="staff" /> <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{""}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button type="submit" disabled={isFetching}>
                    Next
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isFetching } = state.practices;
  const { user } = state.user;

  return { user, isFetching };
}

export default connect(mapStateToProps)(AddPractice);
