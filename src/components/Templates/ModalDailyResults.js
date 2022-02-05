import React, {useState, useEffect} from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSave,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import Form from "../UI/Form";
import Input from "../UI/Input";

export default function ModalDailyResults(props) {
  const [range, setRange] = useState(0);

  const checkDate = date =>{
    const nDate = new Date().toLocaleDateString('en-US');
    const currDate = new Date(date).toLocaleDateString('en-US')

    if(nDate === currDate) return true;
    return false;
  }

  const timeDifference = (props) => {
    const date = props.data.date;
    const arr = [];
    date.split("/").map((x,i) => {
      if(i !== 1) arr.push(x);
      if(i === 1) arr.unshift(x);
    })
    const nd = arr.join("/");
    const predicate = checkDate(nd);
    setRangeMaxValue(predicate, props)
  };

  const setRangeMaxValue = (predicate, props) => {
    if(!predicate) setRange(12);

    console.log(predicate ,props)
  }

  useEffect(() => {
    if(props.state) timeDifference(props);
  }, [])

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
        <div className="text-uppercase">Misceleaneous</div>
        <div className="ticket-area"></div>
        <div className="btn-area">
          <Button className="text-uppercase add-btn">
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </div>
        <div className="control-area">
          <span className="d-block text-uppercase">
            <strong>Work break time</strong>
          </span>
          <Form id="daily-form" action=".." method="post" onSubmit="..">
            <div className="form-group">
              <Input
                type="range"
                id="work-break"
                name="work-break"
                cname="Work Break"
                data_not_required={true}
                max={range}
                min="0"
                step="0.05"
              ></Input>
              <Badge bg="secondary" className="d-inline">
                {"00:00"}
              </Badge>
            </div>
            <div className="form-group">
              <Input
                type="range"
                id="working-time"
                name="working-time"
                cname="Working Time"
                data_not_required={true}
                max={range}
                min="0"
                step="0.05"
              ></Input>
              <Badge bg="secondary" className="d-inline">
                {"00:00"}
              </Badge>
            </div>
            <div className="form-group row-reverse">
              <Input
                type="checkbox"
                id="save-send"
                name="Save/Send"
                data_not_required={true}
                cname="Tearms and conditions"
              ></Input>
            </div>
            <div className="form-group btn-area">
              <Button className="text-uppercase save-btn">
                <FontAwesomeIcon icon={faSave} /> Save
              </Button>
              <Button className="text-uppercase send-btn">
                <FontAwesomeIcon icon={faShareSquare} /> Send
              </Button>
            </div>
          </Form>
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
