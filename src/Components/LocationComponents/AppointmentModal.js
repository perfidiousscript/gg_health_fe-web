import React from "react";
import Calendar from "react-calendar";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

class AppointmentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: {}
    };
  }
  hourOptions() {
    let optionArray = [];
    for (var i = 1; i <= 12; i++) {
      optionArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return optionArray;
  }

  minuteOptions() {
    let optionArray = [];
    for (var i = 0; i <= 12; i++) {
      optionArray.push(
        <option key={i} value={i * 5}>
          {i * 5}
        </option>
      );
    }

    return optionArray;
  }

  showDates(dates) {
    let datesHtml = [];
    if (dates.start) {
      datesHtml.push(
        <p>
          Create appointment for {dates.start.getMonth()}/
          {dates.start.getDate()} to {dates.end.getMonth()}/
          {dates.end.getDate()}
        </p>
      );
    } else if (dates.date) {
      datesHtml.push(
        <p>
          Create appointment for {dates.date.getMonth()}/{dates.date.getDate()}{" "}
        </p>
      );
    } else {
      datesHtml.push(<p>No Dates Selected</p>);
    }
    return datesHtml;
  }

  handleSelect = newDate => {
    const { dates } = this.state;
    let newDateObject = {};
    if (dates.date) {
      if (dates.date <= newDate) {
        newDateObject.start = dates.date;
        newDateObject.end = newDate;
      } else {
        newDateObject.start = newDate;
        newDateObject.end = dates.date;
      }
    } else {
      newDateObject = { date: newDate };
    }

    this.setState({ dates: newDateObject });
  };

  render() {
    const { handleClose, services } = this.props;
    const { dates } = this.state;

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Modal!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.showDates(dates)}</p>
          <Calendar
            calendarType="US"
            selectRange
            onClickDay={this.handleSelect}
          />
          <Formik
            onSubmit={values => {
              // dispatch(addAppointment(values));
            }}
          >
            {({ isFetching, responseStatus }) => (
              <Form>
                <label name="startTime">Start Time: </label>
                <br />
                <select id="startTimeHour">{this.hourOptions()}</select>
                <select id="startTimeMinutesr">{this.minuteOptions()}</select>
                <select id="startTimeamPm">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
                <br />
                <label name="endTime">End Time: </label>
                <br />
                <select id="endTimeHour">{this.hourOptions()}</select>
                <select id="endTimeMinutesr">{this.minuteOptions()}</select>
                <select id="endTimeamPm">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.onSubmit}>
            Create Appointment
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default AppointmentModal;
