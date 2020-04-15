import React from "react";
import Calendar from "react-calendar";
import LocationModal from "./LocationModal.js";
import "react-calendar/dist/Calendar.css";
import "./Location.css";
import { Modal } from "react-bootstrap";

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location.state.location,
      show: false,
      dateObject: {},
      sampleDateHash: { 8: "Opening", 15: "Opening" }
    };
  }

  tileContents = ({ activeStartDate, date, view }) => {
    let { sampleDateHash } = this.state;
    return <p>{sampleDateHash[date.getDate()]}</p>;
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = date => {
    const { location, show, sampleDateHash } = this.state;
    let parsedDate = Date(date);
    let dateObject = {};

    dateObject.parsedDate = parsedDate;
    dateObject.year = date.getFullYear();
    dateObject.month = date.getMonth();
    dateObject.date = date.getDate();
    dateObject.contents = sampleDateHash[dateObject.date];

    this.setState({ show: true, dateObject: dateObject });
  };

  render() {
    const { location, show, dateObject } = this.state;

    return (
      <div>
        <h4>{location.name}</h4>
        <p> Primary Service: {location.services.primary_service}</p>
        <p> Phone Number: {location.phone_number}</p>
        <Modal show={show} onHide={this.handleClose}>
          <LocationModal
            handleClose={this.handleClose}
            dateObject={dateObject}
            location={location}
          />
        </Modal>
        <Calendar
          calendarType="US"
          onClickDay={this.handleShow}
          tileContent={this.tileContents}
        />
      </div>
    );
  }
}

export default Location;
