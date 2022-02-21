import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSave,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../UI/Input";
import {
  makeTaskGroup,
  getFormValues,
  calcFinalWT,
} from "../../events/onModal";
import { setWorkingTime } from "../../events/onDailyResults";
import { saveDailyTasks, fetchTask } from "../../events/saveDailyTasks";
import { getIp } from "./currentIp";
import { getCurrentTime } from "./currentTime";

export default function ModalDailyResults(props) {
  const [range, setRange] = useState(0);

  const checkDate = (date) => {
    const nDate = new Date().toLocaleDateString("en-US");
    const currDate = new Date(date).toLocaleDateString("en-US");

    if (nDate === currDate) return true;
    return false;
  };

  const timeDifference = (props) => {
    const date = props.data.date;
    const arr = [];
    date.split("/").map((x, i) => {
      if (i !== 1) arr.push(x);
      if (i === 1) arr.unshift(x);
    });
    const nd = arr.join("/");
    const predicate = checkDate(nd);
    setRangeMaxValue(predicate, props);
  };

  const setRangeMaxValue = (predicate, props) => {
    if (!predicate) return setRange(720);

    function getMaxValueRange(h) {
      const stime = convertSTime(h);
      const ntime = getTimeNow();

      function convertSTime(h) {
        const arr = h.split(":");
        arr.pop();
        return arr.join(":");
      }

      function getTimeNow() {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return `${hour}:${minutes}`;
      }

      function mathValue(s, n) {
        const sDes = s.split(":");
        const nDes = n.split(":");
        let minutes = 0;
        let hour = 0;

        if(sDes[0] === nDes[0] && sDes[1] === nDes[1]) return "00:00";

        parseInt(nDes[1]) > parseInt(sDes[1])
          ? (minutes = parseInt(nDes[1]) - parseInt(sDes[1]))
          : (minutes = parseInt(nDes[1]) + 60 - parseInt(sDes[1]));
        parseInt(nDes[1]) > parseInt(sDes[1])
          ? (hour = parseInt(nDes[0]) - parseInt(sDes[0]))
          : (hour = parseInt(nDes[0] - 1) - parseInt(sDes[0]));

        minutes < 10 ? (minutes = `0${minutes}`) : (minutes = `${minutes}`);
        hour < 10 ? (hour = `0${hour}`) : (hour = `${hour}`);
        
        return `${hour}:${minutes}`;
      }

      const time = mathValue(stime, ntime);

      const res = converTtoR(time);

      function converTtoR(t) {
        const h = t.split(":")[0];
        const m = t.split(":")[1];

        return parseInt(h) * 60 + parseInt(m);
      }

      return res;
    }
    setRange(getMaxValueRange(props.data.startTime));
  };

  function getCheckBoxTerms(area) {
    const obj = {};
    const item = area.querySelector("#save-send");
    obj.item = item;
    obj.isCheck = item.checked;
    return obj;
  }

  function getWTvalue(area) {
    const wt = area.querySelector("#working-time");
    const obj = {};
    obj.badge = wt.nextElementSibling;
    obj.value = wt.nextElementSibling.innerHTML;
    return obj;
  }

  function handleClickAdd(e) {
    const parent = e.target.parentElement.parentElement;
    const children = parent.children;
    const ticketArea = Object.values(children).filter(
      (x) => x.id === "ticket-mis"
    );
    makeTaskGroup(ticketArea, e, range);
  }

  function sendTaks(e, obj, finalwt) {
    const fetchData = saveDailyTasks(e);
    setWorkingTime(finalwt, props.data.date);
    fetchTask(fetchData, props.data.date, obj["working-time"]);
    props.show(false);
  }

  function setTableValues(data) {
    const row = document.getElementById(data.date);
    row.querySelector('[type="t-end"]').innerText = data.time;
    row.querySelector('[type="ip-of"]').innerText = data.logoutIp;
    row.querySelector('[name="submitResult"]').remove();
    return row;
  }

  async function submitHandler(e) {
    e.preventDefault();
    const obj = getFormValues(e.target);
    const finalwt = calcFinalWT(obj);

    if (e.nativeEvent.submitter.id === "save-btn") {
      sendTaks(e, obj, finalwt);
    }

    if (e.nativeEvent.submitter.id === "send-btn") {
      const checkObj = getCheckBoxTerms(e.target);
      const wtObj = getWTvalue(e.target);
      if (checkObj.isCheck && wtObj.value !== "00:00") {
        const sendObj = {};
        sendObj.ip = await getIp();
        sendObj.time = getCurrentTime();
        if (sendObj.ip && sendObj.time && props.data.date) {
          const data = {
            time: sendObj.time.fullTime,
            logoutIp: sendObj.ip,
            wt: wtObj.value,
            date: props.data.date,
          };
          sendTaks(e, obj, finalwt);
          axios
            .patch(window.location.origin + "/finalDay", null, { params: data })
            .then((res) => {
              setTableValues(data);
              return res.request.response;
            })
            .catch((err) => {
              throw new Error("Request Failed: 163-MDR.js" + err);
            });
        } else {
          throw new Error("Missing information: 142-MDR.js");
        }
      }
    }
  }

  useEffect(() => {
    if (props.state) timeDifference(props);
  }, []);

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
        <div id="ticket-mis" className="ticket-area"></div>
        <div className="btn-area">
          <Button
            className="text-uppercase add-btn"
            onClick={(e) => {
              handleClickAdd(e);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </div>
        <div className="control-area">
          <span className="d-block text-uppercase">
            <strong>Work break time</strong>
          </span>
          <form
            className="default"
            id="daily-form"
            method="post"
            onSubmit={submitHandler}
          >
            <div className="form-group">
              <Input
                type="range"
                id="work-break"
                name="work-break"
                cname="Work Break"
                data_not_required={true}
                max={range}
                min="0"
                step="5"
                handleChange="change"
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
                step="5"
                handleChange="change"
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
              <Button
                id="save-btn"
                className="text-uppercase save-btn"
                type="submit"
              >
                <FontAwesomeIcon icon={faSave} /> Save
              </Button>
              <Button
                id="send-btn"
                className="text-uppercase send-btn"
                type="submit"
              >
                <FontAwesomeIcon icon={faShareSquare} /> Send
              </Button>
            </div>
          </form>
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
