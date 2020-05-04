import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { Practice, Contact, User } from "../../js/interfaces/index";

import { editPractice } from "../../js/actions/practice_actions.js";

interface Location {
  state: EditPracticeState;
}

interface EditPracticeProps {
  user: User;
  isFetching: boolean;
  responseStatus: number;
  location: Location;
}

interface EditPracticeState {
  practice: Practice;
  contactRowValues: Contact[];
}

interface SubmittedValues {
  id: number;
  contact: Contact[];
  name: string;
  staff: number[];
}

class EditPractice extends Component<EditPracticeProps, EditPracticeState> {
  constructor(props: EditPracticeProps) {
    super(props);

    const { practice } = this.props.location.state;

    this.state = {
      practice: practice,
      contactRowValues: practice.contact
    };

    this.handleChange = this.handleChange.bind(this);
  }

  contactRows = () => {
    const { contactRowValues } = this.state;

    return (
      <div>
        {contactRowValues.map((rowArray: RowArray, index: number) => {
          let indexString = index.toString();
          return (
            <div key={index}>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label htmlFor="contactType">Contact Type</label>
                </Col>
                <Col md={{ span: 2 }}>
                  <label htmlFor="contactInfo">Contact Info</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <input
                    type="text"
                    id={indexString}
                    data-kind="type"
                    value={rowArray.type}
                    onChange={this.handleChange}
                    name={`contactType${indexString}`}
                  />
                </Col>
                <Col md={{ span: 2 }}>
                  <input
                    type="text"
                    id={indexString}
                    data-kind="value"
                    value={rowArray.value}
                    onChange={this.handleChange}
                    name={`contactInfo${indexString}`}
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
    const { user, isFetching } = this.props;
    const { practice } = this.state;
    return (
      <div>
        <Formik
          initialValues={{
            name: practice.name,
            user_id: user.id,
            staff: practice.staff
          }}
          onSubmit={values => {
            const { contactRowValues } = this.state;
            let submittedValues: SubmittedValues = {
              ...values,
              contact: contactRowValues,
              id: this.state.practice.id
            };

            editPractice(values);
          }}
        >
          {() => (
            <Form>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label htmlFor="name">Practice Name</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="name" /> <br />
                </Col>
              </Row>
              {this.contactRows()}
              <Col md={{ span: 2, offset: 4 }}>
                <button type="button" onClick={this.addContactField}>
                  Add Contact Type
                </button>
              </Col>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label htmlFor="staff">Staff</label>
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
function mapStateToProps(state: any) {
  const { isFetching, responseStatus } = state.practices;
  const { user } = state.user;

  return { user, isFetching, responseStatus };
}

export default connect(mapStateToProps)(EditPractice);
