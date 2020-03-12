import React from "react";
import Store from "./js/store/index.js";

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      locations: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    var store = Store.getState();
    this.setState({
      user: store.user,
      locations: store.locations,
      isLoaded: true
    });

    // Store.subscribe(() => {
    //   console.log("Store: ", Store.getState());
    // });
  }

  renderHelper() {
    const data = this.state;
    if (!data.locations[0]) {
      return <p>"Loading..."</p>;
    }
    return (
      <div>
        <h1>Locations</h1>
        <div className="locations">
          {this.state.locations.map((location, index) => (
            <div key={index}>{location.name}</div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderHelper()}</div>;
  }
}

export default Locations;
