import axios from "axios";
import { makeTaskGroup } from "./onModal";

export function setWorkingTime(wt, date){
    const cwt = `${wt.hour}:${wt.minutes}`;
    const row = document.getElementById(date);
    const el = Object.values(row.children).filter(x => x.attributes.type?.value === 'w-time');
    el[0].dataset.wtime = cwt;
    el[0].innerText = cwt;
}

export function getDailyTaks(date, e){
    const data = { date: date};
    const axios = require('axios');
    
    axios
      .get(window.location.origin + "/task-results", { params: data })
      .then((res) => {
        if (res.status === 200) {
          olderResult(JSON.parse(res.request.response), e, date)
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

function olderResult(jdata, e, date){
  if(jdata.length === 0) return null;
  console.log(date)
  const data = {date};
  console.log(data)
  const axios = require('axios');
  axios
      .delete(window.location.origin + "/task-delete", { params: data })
      .then((res) => {
        if (res.data) setResultToModal(jdata, e);
      })
      .catch((err) => {
        console.log(err);
      });
}

function setResultToModal(data, event){
  data.forEach((x, i) => {
    const area = document.getElementById("ticket-mis");
    const range = convertTimetoRange(x.workTime)
    const maxRange = getMaxRange('work-break');
    x.range = range;
    event.timeStamp = event.timeStamp + i
    makeTaskGroup([area], event, maxRange, x)

  })
}

function convertTimetoRange(time){
  const sp = time.split(':')
  const hour = parseInt(sp[0]) * 60;
  const minutes = parseInt(sp[1]);

  return hour + minutes;
}
// work-break

function getMaxRange(target){
  const el = document.getElementById(target)
  return el.max;
}