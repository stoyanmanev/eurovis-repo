import React from 'react'
import { Modal, Button, Badge } from "react-bootstrap";

export default function ModalDailyView(props) {
    function makeTaskGroup(record){
      return (
        <div className='task-group'>
          <span className='task-name'>{record.task}</span><Badge bg="secondary">{record.workTime}</Badge>
        </div>
      )
    }

    return (
        <Modal
          show={props.state}
          onHide={() => props.show(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Daily result for{" "}
              <Badge bg="secondary" className="d-inline">
                {props.data.date}
              </Badge>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="ticket-view-area" className="ticket-area">
                {props.taskList.map(x => makeTaskGroup(x))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ligth" onClick={() => props.show(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      );
}
