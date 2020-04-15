import React from "react";
import { Modal, Button } from "react-bootstrap";

class LocationModal extends React.Component {
  render() {
    const { handleClose, dateObject, location } = this.props;

    let dateArray = dateObject.parsedDate.split(" ");

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{location.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{`${dateArray[0]}, ${dateArray[1]} ${dateArray[2]} ${
            dateArray[3]
          }`}</h4>
          <p>{dateObject.contents}</p>
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

export default LocationModal;
