import React from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = { location: this.props.location.state.location };
  }
  render() {
    const { location } = this.state;

    return (
      <div>
        <h4>{location.name}</h4>
        <p> Primary Service: {location.services.primary_service}</p>
        <p> Phone Number: {location.phone_number}</p>
      </div>
    );
  }
}

export default Location;
