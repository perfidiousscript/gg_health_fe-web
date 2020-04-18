import React from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

class AppointmentModal extends React.Component {
  timeOptions() {
    let optionArray = [];
    for (var i = 0; i <= 12; i++) {
      optionArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return optionArray;
  }
  render() {
    const { handleClose, dates } = this.props;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Modal!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ dates: dates }}
            onSubmit={values => {
              // dispatch(editLocation(values));
            }}
          >
            {({ isFetching, responseStatus }) => (
              <Form>
                <select id="startTime">{this.timeOptions()}</select>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default AppointmentModal;
