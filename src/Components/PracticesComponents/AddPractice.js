import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { createPractice } from "../../js/actions/practice_actions.js";

class AddPractice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contactRowValues: [{ type: "", value: "" }] };
    this.handleChange = this.handleChange.bind(this);
  }

  contactRows = () => {
    const { contactRowValues } = this.state;

    return (
      <div>
        {contactRowValues.map((rowArray, index) => {
          return (
            <div key={index}>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="contactType">Contact Type</label>
                </Col>
                <Col md={{ span: 2 }}>
                  <label for="contactInfo">Contact Info</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <input
                    type="text"
                    id={index}
                    data-kind="type"
                    value={rowArray.type}
                    onChange={this.handleChange}
                    name={`contactType${index}`}
                  />
                </Col>
                <Col md={{ span: 2 }}>
                  <input
                    type="text"
                    id={index}
                    data-kind="value"
                    value={rowArray.value}
                    onChange={this.handleChange}
                    name={`contactInfo${index}`}
                  />
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  };

  addContactField = e => {
    e.preventDefault();
    const { contactRowValues } = this.state;

    let updatedContactRowValues = contactRowValues;

    updatedContactRowValues.push({ type: "", value: "" });

    this.setState({
      contactRowValues: updatedContactRowValues
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { contactRowValues } = this.state;
    let kind = e.target.getAttribute("data-kind");
    let id = e.target.id;
    let updatedContactRowValues = contactRowValues;

    updatedContactRowValues[id][kind] = e.target.value;

    this.setState({
      contactRowValues: updatedContactRowValues
    });
  };

  render() {
    const { user, dispatch, isFetching, contactRowValues } = this.props;
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
            user_id: user.id,
            staff: []
          }}
          onSubmit={values => {
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
              {this.contactRows()}
              <Col md={{ span: 2, offset: 4 }}>
                <button type="addContact" onClick={this.addContactField}>
                  Add Contact Type
                </button>
              </Col>
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
