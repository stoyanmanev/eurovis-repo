import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalDailyResults(props) {
  console.log('child' + props.state);



  return (
    <Modal show={props.state} onHide={() => props.show(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.show(false)}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}
