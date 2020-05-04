import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import {
  RowArray,
  BasePropsInterface,
  User,
  Contact
} from "../../js/interfaces/index";

import { createPractice } from "../../js/actions/practice_actions.js";

interface AddPracticeProps extends BasePropsInterface {
  user: User;
}

interface AddPracticeState {
  contactRowValues: Contact[];
}

class AddPractice extends Component<AddPracticeProps, AddPracticeState> {
  constructor(props: AddPracticeProps) {
    super(props);
    this.state = { contactRowValues: [{ type: "", value: "" }] };
    this.handleChange = this.handleChange.bind(this);
  }

  contactRows = (contactRowValues: []) => {
    return (
      <div>
        {contactRowValues.map((rowArray: RowArray, index: number) => {
          let indexString: string = index.toString();
          return (
            <div key={indexString}>
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
                    data-number={index}
                    value={rowArray.type}
                    onChange={(ev: FormEvent<HTMLInputElement>): void =>
                      this.handleChange(ev)
                    }
                    name={`contactType${indexString}`}
                  />
                </Col>
                <Col md={{ span: 2 }}>
                  <input
                    type="text"
                    id={indexString}
                    data-kind="value"
                    data-number={index}
                    value={rowArray.value}
                    onChange={(ev: FormEvent<HTMLInputElement>): void =>
                      this.handleChange(ev)
                    }
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

  addContactField = () => {
    // event.preventDefault();
    const { contactRowValues } = this.state;

    let updatedContactRowValues = contactRowValues;

    updatedContactRowValues.push({ type: "", value: "" });

    this.setState({
      contactRowValues: updatedContactRowValues
    });
  };

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { contactRowValues } = this.state;
    let id: string = event.currentTarget.getAttribute("data-number");
    let kind: string = event.currentTarget.getAttribute("data-kind");
    let updatedContactRowValues = contactRowValues;

    updatedContactRowValues[id][kind] = event.currentTarget.value;

    this.setState({
      contactRowValues: updatedContactRowValues
    });
  };

  render() {
    const { user, isFetching, responseStatus, error } = this.props;
    const { contactRowValues } = this.state;

    if (!isFetching) {
      if (responseStatus == "created") {
        this.props.history.push("/manager-dashboard");
      }
    }

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
            staff: [],
            contact: [],
            isFetching: false
          }}
          onSubmit={values => {
            values.contact = contactRowValues;
            createPractice(values);
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
              {this.contactRows(contactRowValues)}
              <Col md={{ span: 2, offset: 4 }}>
                <Button
                  onClick={() => {
                    this.addContactField();
                  }}
                >
                  Add Contact Type
                </Button>
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
  const { isFetching, responseStatus, error } = state.practices;
  const { user } = state.user;

  return { user, isFetching, responseStatus, error };
}

export default connect(mapStateToProps)(AddPractice);
