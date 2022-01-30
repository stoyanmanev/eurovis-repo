import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Result from "./Result";
import { Table } from "react-bootstrap";
import { setLoading } from "../../redux/actions";
import { isLoading } from "../../redux/reducers";
import Loading from "../Templates/Loader";

const DailyResultComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);

  const [result, setResult] = useState(false);
  const [day, setDay] = useState(undefined);
  const [ip, setIp] = useState(undefined);
  const [check, setCheck] = useState(true);

  const renderDR = () => {
    axios
      .get(window.location.origin + "/results", null)
      .then((res) => {
        setResult(res.data); // todo redux
      })
      .catch((error) => {
        alert("render: " + error);
      })
      .finally(() => {
          console.log('finally');
        // dispatch(setLoading(false));
      });
  };

  const createRecord = () => {
    let time = day.indexOf(",");
    time = day.slice(time + 2, day.length);
    let date = day.indexOf(",");
    date = day.slice(0, date);

    const data = { date, time, ip };
    axios
      .post(window.location.origin + "/daily-record", null, { params: data })
      .then((res) => {
        if (res.status === 200) {
          setDay(undefined);
          renderDR();
        }
      })
      .catch((error) => {
        alert("create-record-error: " + error);
      })
  };

  const getIp = () => {
    axios
      .get("https://httpbin.org/ip", null)
      .then((res) => {
        setIp(res.data.origin);
      })
      .catch((err) => {
        alert("error get ip: " + err);
      });
  };

  const checkResult = () => {
    // dispatch(setLoading(true));
    console.log('check');
    setCheck(false);

    const newDate = new Date().toLocaleString("en-GB");
    let dateCustom = newDate.indexOf(",");
    dateCustom = newDate.slice(0, dateCustom);

    const data = { date: dateCustom };
    axios
      .post(window.location.origin + "/check-date", null, { params: data })
      .then((res) => {
        if (res.status === 200 && res.data === true) {
          setDay(newDate);
          getIp();
        } else if (res.data === false) {
          renderDR();
        }
      })
      .catch((err) => {
        alert("check error: " + err);
      })
  };

  if (check) {
    checkResult();
  } else {
    if (day !== undefined && ip !== undefined) {
      createRecord();
    }
  }

//   if (loading) {
//     return <Loading />;
//   }

  return (
    <>
      <h1>Daily Results</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>View</th>
            <th>Send</th>
            <th>Date</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Login IP</th>
            <th>Logout IP</th>
            <th>Working Time</th>
          </tr>
        </thead>
        <tbody>
          {
            result !== false ? (
              <>
                {result.map((res) => (
                  <Result data={res} />
                ))}
              </>
            ) : (
              <p>Not Found</p>
            ) //todo component
          }
        </tbody>
      </Table>
    </>
  );
};

export default DailyResultComponent;
