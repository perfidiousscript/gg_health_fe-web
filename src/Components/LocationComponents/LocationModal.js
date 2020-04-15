import React from "react";
import { Modal, Button } from "react-bootstrap";

class LocationModal extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClose = this.handleClose.bind(this);
  }
  render() {
    const { handleClose } = this.props;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
