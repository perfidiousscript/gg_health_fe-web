import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Location.css";

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = { location: this.props.location.state.location };
  }

  onClick = date => {
    let parsedDate = Date(date);
    let dateObject = {};
    dateObject.year = date.getFullYear();
    dateObject.month = date.getMonth();
    dateObject.date = date.getDate();
    console.log("dateObject: ", dateObject);
  };

  render() {
    const { location } = this.state;

    return (
      <div>
        <h4>{location.name}</h4>
        <p> Primary Service: {location.services.primary_service}</p>
        <p> Phone Number: {location.phone_number}</p>
        <Calendar
          calendarType="US"
          onClickDay={this.onClick}
          value={this.state.date}
          // tileContent={this.generateContent()}
        />
      </div>
    );
  }
}

export default Location;
