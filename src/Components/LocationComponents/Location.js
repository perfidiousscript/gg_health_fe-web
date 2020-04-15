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
      show: false
    };
  }

  onClick = date => {
    let parsedDate = Date(date);
    let dateObject = {};
    dateObject.year = date.getFullYear();
    dateObject.month = date.getMonth();
    dateObject.date = date.getDate();
    console.log("dateObject: ", dateObject);
  };

  tileContents = ({ activeStartDate, date, view }) => {
    let sampleDateHash = { 8: "Opening", 15: "Opening" };
    return <p>{sampleDateHash[date.getDate()]}</p>;
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { location, show } = this.state;

    return (
      <div>
        <h4>{location.name}</h4>
        <p> Primary Service: {location.services.primary_service}</p>
        <p> Phone Number: {location.phone_number}</p>
        <Modal show={show} onHide={this.handleClose}>
          <LocationModal handleClose={this.handleClose} />
        </Modal>
        <Calendar
          calendarType="US"
          onClickDay={this.handleShow}
          value={this.state.date}
          tileContent={this.tileContents}
          // tileContent={this.generateContent()}
        />
      </div>
    );
  }
}

export default Location;
