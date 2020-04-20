import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPractices } from "../../js/actions/practice_actions.js";

class Practices extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPractices());
  }

  contactList(contacts) {
    let practiceContacts = [];

    contacts.map((contact, index) =>
      practiceContacts.push(
        <p key={index}>
          {contact.type}: {contact.value}
        </p>
      )
    );

    return practiceContacts;
  }

  renderHelper() {
    const { isFetching, practices } = this.props;

    if (isFetching) {
      return <h3>Loading...</h3>;
    } else if (!practices) {
      return (
        <div>
          <h3> No Practices Yet!</h3> <br />
          <Link to="/add-practice">Create Your Practice</Link>
        </div>
      );
    } else if (practices.length == 1) {
      const practice = practices[0];
      return (
        <div>
          <h3> Your Practice!</h3>
          <p>Name: {practice.name}</p>
          <h4>Contact Info:</h4>
          {this.contactList(practice.contact)}
          <Link
            to={{
              pathname: "/edit-practice",
              state: { type: "edit", practice: practice }
            }}
          >
            Edit Your Practice
          </Link>
          <br />
          <Link
            to={{
              pathname: "/locations",
              state: { type: "practice", practice: practice.id }
            }}
          >
            View/Edit Locations For this Practice
          </Link>
          <br />
          <Link to="/add-practice">Add a Practice</Link>
        </div>
      );
    } else if (practices.length > 1) {
      return (
        <div>
          <h3>Whoa you have a bunch of practices!</h3>
          <br />
          <Link to="/add-practice">Add a Practice</Link>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderHelper()}</div>;
  }
}

function mapStateToProps(state) {
  const { practices, isFetching } = state.practices;

  return { practices, isFetching };
}

export default connect(mapStateToProps)(Practices);
