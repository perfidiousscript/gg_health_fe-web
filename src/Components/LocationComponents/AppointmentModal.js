import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

class AppointmentModal extends React.Component {
  render() {
    const { handleClose, dates } = this.props;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Modal!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ start: dates.start, end: dates.end }}
            onSubmit={values => {
              // dispatch(editLocation(values));
            }}
          ></Formik>
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
