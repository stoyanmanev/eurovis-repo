import axios from "axios";

export function saveDailyTasks(e) {
  const parent = e.target.parentElement.parentElement;
  const colection = Object.values(
    Object.values(parent.querySelectorAll(".form-group")).map((x) => x.children)
  );

  const group = colection.map(x => Object.values(x).filter(y => y.type === 'text' || y.classList.contains('badge')));
  const convert = group.filter(x => x.length >= 2);

  return convert
}


export function fetchTask(arr, date, ftw){
  const valueTask = Object.values(arr).map(x => x.map(y => {
    if(y.nodeName === 'INPUT'){
      return y.value;
    }else{
      return y.innerText;
    }
  }))

  valueTask.forEach(x => sendTask(date, x[0], x[1], ftw));
}

function sendTask(date, name, value, finalWt){

  const data = { date: date, task: name, wt: value, fwt: finalWt};

  const axios = require('axios');
  axios
      .post(window.location.origin + "/create-task", null, { params: data })
      .then((res) => {
        if (res.status === 200) {
          return res // todo done record
        }
      })
      .catch((err) => {
        console.log(err);
      });
}