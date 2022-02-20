import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getDailyTask, olderResult } from "../../events/onDailyResults";
import { getCurrentDateStartTime } from "../Templates/currentDate";

const Result = (props) => {
  async function handlerViewResult(date, view) {
    view(true);
    const listTask = await getDailyTask(date);
    props.setList(listTask);
  }

  function handlerDataResult(data, view, event) {
    const obj = {
      date: getCurrentDateStartTime(event, "date"),
      startTime: getCurrentDateStartTime(event, "t-start"),
    };

    data(obj);
    view(true);
    olderResult(obj.date, event);
  }

  return (
    <tr id={props.data.date} className="text-center">
      <td>
        <Button
          name="viewResult"
          className="view-result"
          onClick={() => handlerViewResult(props.data.date, props.handlerView)}
        >
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        </Button>
      </td>
      <td>
        {!props.data.ipLogout && !props.data.timeEnd && (
          <Button
            name="submitResult"
            className="submit-result"
            onClick={(e) =>
              handlerDataResult(props.dailyData, props.handler, e)
            }
          >
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </Button>
        )}
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
