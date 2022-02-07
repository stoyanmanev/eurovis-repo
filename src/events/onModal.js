export function handleChange(e) {
  const parent = e.target.parentElement;
  const children = parent.children;

  const badge = Object.values(children).filter((x) =>
    x.classList.contains("badge")
  );

  function converValue(value, badge) {
    let hours = 0;
    let minutes = 0;

    for (let x = value; x >= 60; x -= 60) {
      hours++;
    }

    minutes = value - hours * 60;

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    const v = `${hours}:${minutes}`;

    setValue(badge, v);
  }

  function setValue(arr, value) {
    Object.values(arr).forEach((x) => (x.innerText = value));
  }

  converValue(e.target.value, badge);
};

export function makeTaskGroup(area, e, range) {
  const div = document.createElement('div');
  const appendList = [makeInput('text', e.timeStamp), makeInput('range', e.timeStamp), makeBadge()];
  div.classList.add('form-group');

  function makeInput(type, unique){
    const input = document.createElement('input');
    input.type = type;
    input.name = `${type}-${parseInt(unique)}`;
    input.id = `${type}-${parseInt(unique)}`;

    if(type === 'range'){
      input.max = range;
      input.min = '0';
      input.value = '0';
      input.step = '5';
      input.onchange = function(e) {handleChange(e)};
    }

    return input;
  }
  function makeBadge(){
    const span = document.createElement('span');
    span.classList.add('d-inline','badge', 'bg-secondary');
    span.innerHTML = '00:00';
    return span;
  }
  appendList.forEach(x => div.appendChild(x));
  Object.values(area)[0].appendChild(div);
};