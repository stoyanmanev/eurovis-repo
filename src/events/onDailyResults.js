import axios from "axios";
import { makeTaskGroup } from "./onModal";

export function setWorkingTime(wt, date){
    const cwt = `${wt.hour}:${wt.minutes}`;
    const row = document.getElementById(date);
    const el = Object.values(row.children).filter(x => x.attributes.type?.value === 'w-time');
    el[0].dataset.wtime = cwt;
    el[0].innerText = cwt;
}

export function getDailyTask(date){
    const data = { date: date};
    const axios = require('axios');
    
    return axios
      .get(window.location.origin + "/task-results", { params: data })
      .then((res) => {
        if (res.status === 200) {
          return JSON.parse(res.request.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

export async function olderResult(date, e){
  const jdata = await getDailyTask(date);
  if(jdata.length === 0) return null;
  const data = {date};
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