import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Result = (props) => {
  return (
    <tr className="text-center">
      <td>
        <Button name="viewResult" className="view-result">
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        </Button>
      </td>
      <td>
        <Button
          name="submitResult"
          className="submit-result"
        >
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </Button>
      </td>
      <td>{props.data.date}</td>
      <td>{props.data.timeStart}</td>
      <td>{props.data.timeEnd}</td>
      <td>{props.data.ipLogin}</td>
      <td>{props.data.ipLogout}</td>
      <td>{props.data.workTime}</td>
    </tr>
  );
};

export default Result;
