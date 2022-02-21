import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Result from "./Result";
import ModalDailyResults from "../Templates/ModalDailyResults";
import { Table } from "react-bootstrap";
import { setDailyResult } from "../../redux/actions";
import { isLoading, isDailyResults } from "../../redux/reducers";
import Loading from "../Templates/Loader";
import ModalDailyView from "../Templates/ModalDailyView";
import Pagination from "./Pagination";

const DailyResultComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);
  const dailyResults = useSelector((state) => state.isDailyResults);

  const [day, setDay] = useState(undefined);
  const [ip, setIp] = useState(undefined);
  const [check, setCheck] = useState(true);
  const [openModalSend, setOpenModalSend] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [dailyData, setDailyData] = useState({});
  const [viewTaskList, setViewTaskList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const indexOfLastDailyResult = currentPage * postPerPage;
  const indexOfFirstDailyResult = indexOfLastDailyResult - postPerPage;
  const currentDailyResult =
  dailyResults !== [] &&
  dailyResults.slice(indexOfFirstDailyResult, indexOfLastDailyResult);

  const paginate = (e, pageNumber) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const renderDR = () => {
    axios
      .get(window.location.origin + "/results", null)
      .then((res) => {
        console.log(res.data.reverse());
        dispatch(setDailyResult(res.data.reverse()));
        getNotEndTask(res.data.reverse());
      })
      .catch((error) => {
        alert("render: " + error);
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
      });
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
      });
  };

  const getNotEndTask = (customData) => {
    if (!customData.length) return null;

    axios
      .get(window.location.origin + "/task-notend", null)
      .then((results) => {
        if (results.data.length <= 0) return null;
        const arr = results.data;
        const substituteWt = arr.map((result) => {
          return customData.map((data) => {
            if (data.date === result.date && data.workTime === "00:00") {
              data.workTime = result.fullWorkTime;
              return data;
            } else {
              return data;
            }
          });
        });
        dispatch(setDailyResult(substituteWt[substituteWt.length - 1]));
      })
      .catch((error) => {
        alert("render: " + error);
      });
  };

  if (check) {
    checkResult();
  } else {
    if (day !== undefined && ip !== undefined) {
      createRecord();
    }
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <h1>Daily Results</h1>
      <Table striped bordered hover className="daily-results">
        <thead>
          <tr className="text-center">
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
            currentDailyResult !== [] ? (
              <>
                {currentDailyResult.map((res) => (
                  <Result
                    data={res}
                    handler={setOpenModalSend}
                    handlerView={setOpenModalView}
                    dailyData={setDailyData}
                    setList={setViewTaskList}
                  />
                ))}
              </>
            ) : (
              <p>Not Found</p>
            ) //todo component
          }
        </tbody>
      </Table>
      <Pagination
        resultPerPage={postPerPage}
        totalResult={dailyResults.length}
        paginate={paginate}
      />
      {openModalSend && (
        <ModalDailyResults
          show={setOpenModalSend}
          state={openModalSend}
          data={dailyData}
        />
      )}
      {openModalView && (
        <ModalDailyView
          show={setOpenModalView}
          state={openModalView}
          data={dailyData}
          taskList={viewTaskList}
        />
      )}
    </>
  );
};

export default DailyResultComponent;
