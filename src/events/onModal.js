export function handleChange(e) {
  const parent = e.target.parentElement;
  const children = parent.children;

  const badge = Object.values(children).filter((x) =>
    x.classList.contains("badge")
  );
  converValue(e.target, badge);
  saveInputGroup(e);
}

function converValue(target, badge) {
  let hours = 0;
  let minutes = 0;

  for (let x = target.value; x >= 60; x -= 60) {
    hours++;
  }

  minutes = target.value - hours * 60;

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  const v = `${hours}:${minutes}`;
  setValue(badge, v, target);
}

function setValue(arr, val, target) {
  target.dataset.value = val;
  Object.values(arr).forEach((x) => (x.innerText = val));
}

// create new task when click the add button

export function makeTaskGroup(area, e, range, data = {}) {
  const div = document.createElement("div");
  const appendList = [
    makeInput("text", e.timeStamp, data),
    makeInput("range", e.timeStamp, data),
    makeBadge(data),
  ];
  div.classList.add("form-group");

  function makeInput(type, unique, data) {
    const input = document.createElement("input");
    input.type = type;
    input.name = `${type}-${parseInt(unique)}`;
    input.id = `${type}-${parseInt(unique)}`;
    data.task && (input.value = data.task)

    if (type === "range") {
      input.max = range;
      input.min = "0";
      data.range ? input.value = data.range : input.value = "0";
      input.step = "5";
      input.onchange = function (e) {
        handleChange(e);
      };
    }

    return input;
  }
  function makeBadge(data = {}) {
    const span = document.createElement("span");
    span.classList.add("d-inline", "badge", "bg-secondary");
    data.workTime ? span.innerHTML = data.workTime : span.innerHTML = "00:00";
    return span;
  }
  appendList.forEach((x) => div.appendChild(x));
  Object.values(area)[0].appendChild(div);
}

//-- create new task when click the add button

export function getFormValues(form) {
  const inputs = Object.values(form.children).map((x) =>
    Object.values(x.children).filter((x) => x.nodeName === "INPUT")
  );
  const arr = Object.values(inputs).filter((x) => x[0]);
  const robj = {};
  arr.forEach((x) => {
    const el = x[0];
    if (el.type === "range")
      return (robj[el.name] =
        typeof el.dataset.value !== "undefined" ? el.dataset.value : "00:00");
    if (el.type === "checkbox") return (robj[el.name] = el.checked);
    return null;
  });

  return robj;
}

export function calcFinalWT(obj) {
  const wt = obj["working-time"];
  const wb = obj["work-break"];
  const wth = wt.split(":")[0];
  const wtm = wt.split(":")[1];
  const wbh = wb.split(":")[0];
  const wbm = wb.split(":")[1];
  const robj = {
    hour: null,
    minutes: null,
  };

  robj.minutes =
    parseInt(wtm) > parseInt(wbm)
      ? parseInt(wtm) - parseInt(wbm)
      : parseInt(wtm) + 60 - parseInt(wbm);
  robj.hour =
    parseInt(wtm) > parseInt(wbm)
      ? parseInt(wth) - parseInt(wbh)
      : parseInt(wth) - 1 - parseInt(wbh);
  if (robj.minutes === 60) {
    robj.minutes = 0;
    robj.hour++;
  }

  if (robj.hour < 0 || robj.minutes < 0) return { hour: "00", minutes: "00" };

  if (robj.minutes < 10) {
    robj.minutes = `0${robj.minutes}`;
  } else {
    robj.minutes = robj["minutes"].toString();
  }

  if (robj.hour < 10) {
    robj.hour = `0${robj.hour}`;
  } else {
    robj.hour = robj["hour"].toString();
  }

  return robj;
}

function saveInputGroup(e) {
  const parent =
    e.currentTarget.parentElement.parentElement.parentElement.classList.contains(
      "control-area"
    )
      ? e.currentTarget.parentElement.parentElement.parentElement.parentElement
      : e.currentTarget.parentElement.parentElement.parentElement;
  const group = parent.querySelectorAll('input[type*="range"]');

  const list = [];
  group.length > 0 &&
  group
    .forEach(
      (x) => {if(typeof x?.value !== "undefined" && x.id !== "working-time"){
        list.push(x);
      }
    }
    )

  const sum = list.length > 0 && list.map( x => parseInt(x.value)).reduce((a,b) => a + b);
  const wb = list.filter(x => x.id === "work-break");
  const targetInput = document.getElementById("working-time");
  targetInput.value = sum;
  targetInput.dataset.break = wb[0].value;
  converValue(targetInput, getWorkBadge(targetInput));
}

function getWorkBadge(input) {
  const parent = input.parentElement;
  const children = parent.children;
  const arrbadge = Object.values(children).filter((x) =>
    x.classList.contains("badge")
  );
  const badge = arrbadge[0];
  return [badge];
}
