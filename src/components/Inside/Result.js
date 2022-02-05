import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Result = (props) => {
  function getCurrentValue(e, name) {
    const parent = e.target.parentElement.parentElement;
    const arrChildren = parent.children;
    let res = '';
    Object.values(arrChildren).forEach((x) => {
      if (
        typeof x.attributes.type !== "undefined" &&
        x.attributes.type.value === name
      ) {
        res = x.outerText;
        return;
      }
    });
    return res;
  }

  function handlerDataResult(data, view, event) {
    const obj = {
      date: getCurrentValue(event, "date"),
      startTime: getCurrentValue(event, "t-start"),
    };

    data(obj);
    view(true);
  }

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
          onClick={(e) => handlerDataResult(props.dailyData, props.handler, e)}
        >
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </Button>
      </td>
      <td type="date">{props.data.date}</td>
      <td type="t-start">{props.data.timeStart}</td>
      <td type="t-end">{props.data.timeEnd}</td>
      <td type="ip-in">{props.data.ipLogin}</td>
      <td type="ip-of">{props.data.ipLogout}</td>
      <td type="w-time">{props.data.workTime}</td>
    </tr>
  );
};

export default Result;
