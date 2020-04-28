import React from "react";
import Calendar from "react-calendar";
import { connect } from "react-redux";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { addAppointment } from "../../js/actions/location_actions.js";

class AppointmentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: {},
      startTimeHour: 9,
      startTimeMinute: 15,
      startTimeAmPm: "AM",
      endTimeHour: 9,
      endTimeMinute: 30,
      endTimeAmPm: "AM",
      service: "",
      isValid: false,
      error: { type: "", message: "" }
    };
  }

  hourOptions = () => {
    let optionArray = [];
    for (var i = 1; i <= 12; i++) {
      optionArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return optionArray;
  };

  minuteOptions = () => {
    let optionArray = [];
    for (var i = 0; i <= 12; i++) {
      let minutes = i * 5;
      let padded_minutes = minutes => {
        return minutes < 10 ? `0${minutes}` : `${minutes}`;
      };
      optionArray.push(
        <option key={i} value={minutes}>
          {padded_minutes(minutes)}
        </option>
      );
    }

    return optionArray;
  };

  showDates = dates => {
    let datesHtml = [];
    if (dates.start) {
      datesHtml.push(
        <p key="multi_date">
          Create appointments each day from {dates.start.getMonth()}/
          {dates.start.getDate()} through {dates.end.getMonth()}/
          {dates.end.getDate()}
        </p>
      );
    } else if (dates.date) {
      datesHtml.push(
        <p key="one_date">
          Create an appointment on {dates.date.getMonth()}/
          {dates.date.getDate()}{" "}
        </p>
      );
    } else {
      datesHtml.push(<p key="no_dates">No Dates Selected</p>);
    }
    return datesHtml;
  };

  handleSelect = newDate => {
    const { dates, error } = this.state;

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
    if (error.type === "date") {
      this.setState({ error: { type: "", message: "" } });
    }
  };

  serviceOptions = services => {
    let servicesHtml = [];

    services.services_list.map(function(service, index) {
      servicesHtml.push(
        <option key={index} value={service}>
          {service}
        </option>
      );
    });

    return servicesHtml;
  };

  //TO DO: Find a way to validate on new values, as this currently runs before state is updated and it uses the old values.
  //Figure out if this needs to be done via redux.
  validate = () => {
    const {
      dates,
      startTimeHour,
      startTimeMinute,
      startTimeAmPm,
      endTimeHour,
      endTimeMinute,
      endTimeAmPm,
      service
    } = this.state;

    let startTime;
    let endTime;

    if (Object.keys(dates).length === 0) {
      this.setState({
        isValid: false,
        error: { type: "date", message: "Please select at least one date!" }
      });
    } else if (dates.date) {
      if (startTimeAmPm === "PM") {
        startTimeHour += 12;
      }
      if (endTimeAmPm === "PM") {
        endTimeHour += 12;
      }

      startTime = Date.UTC(
        dates.date.getYear() + 1900,
        dates.date.getMonth(),
        dates.date.getDate(),
        startTimeHour,
        startTimeMinute
      );

      endTime = Date.UTC(
        dates.date.getYear() + 1900,
        dates.date.getMonth(),
        dates.date.getDate(),
        endTimeHour,
        endTimeMinute
      );

      if (startTime < endTime) {
        this.setState({
          isValid: true,
          error: {
            type: "",
            message: ""
          }
        });
      } else {
        this.setState({
          isValid: false,
          error: {
            type: "endTime",
            message: "Appointment Start Time must come before End Time!"
          }
        });
      }
    } else if (dates.start) {
    }
  };

  changeAndValidate = e => {
    this.onChange(e);
    this.validate();
  };

  onChange = e => {
    e.preventDefault();

    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      [id]: value
    });
  };

  onSubmit = () => {
    console.log("state: ", this.state);
  };

  render() {
    const { handleClose, services, isFetching } = this.props;
    const {
      dates,
      startTimeHour,
      startTimeMinute,
      startTimeAmPm,
      endTimeHour,
      endTimeMinute,
      endTimeAmPm,
      service,
      isValid,
      error
    } = this.state;

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Create Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.showDates(dates)}
          <Calendar
            calendarType="US"
            selectRange
            onClickDay={this.handleSelect}
          />
          <Row>
            <Col md={{ span: 6 }}>
              <label name="startTime">Start Time: </label>
            </Col>

            <Col md={{ span: 6 }}>
              <label name="endTime">End Time: </label>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6 }}>
              <select
                id="startTimeHour"
                value={startTimeHour}
                onChange={this.onChange}
              >
                {this.hourOptions()}
              </select>
              <select
                id="startTimeMinute"
                value={startTimeMinute}
                onChange={this.onChange}
              >
                {this.minuteOptions()}
              </select>
              <select
                id="startTimeAmPm"
                value={startTimeAmPm}
                onChange={this.onChange}
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </Col>
            <Col md={{ span: 6 }}>
              <select
                id="endTimeHour"
                value={endTimeHour}
                onChange={this.changeAndValidate}
              >
                {this.hourOptions()}
              </select>
              <select
                id="endTimeMinute"
                value={endTimeMinute}
                onChange={this.changeAndValidate}
              >
                {this.minuteOptions()}
              </select>
              <select
                id="endTimeAmPm"
                value={endTimeAmPm}
                onChange={this.changeAndValidate}
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6 }}>
              <label name="service">Choose Service to offer: </label>
              <select id="service" value={service} onChange={this.onChange}>
                {this.serviceOptions(services)}
              </select>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 6 }}>
              <Button
                type="submit"
                disabled={isFetching || !isValid}
                onClick={this.onSubmit}
              >
                Create Appointment
              </Button>
            </Col>
            <Col md={{ span: 6 }}>
              <p>{error.message}</p>
            </Col>
          </Row>
        </Modal.Body>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, responseStatus, error } = state.locations;

  return { isFetching, responseStatus, error };
}

export default connect(mapStateToProps)(AppointmentModal);
