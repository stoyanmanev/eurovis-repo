export function getCurrentTime() {
  const date = new Date();
  const objDate = {};
  objDate.hours =
    date.getHours() < 10 ? type2digit(date.getHours()) : date.getHours();
  objDate.minutes =
    date.getMinutes() < 10 ? type2digit(date.getMinutes()) : date.getMinutes();
  objDate.seconds =
    date.getSeconds() < 10 ? type2digit(date.getSeconds()) : date.getSeconds();
  objDate.fullTime = `${objDate.hours}:${objDate.minutes}:${objDate.seconds}`;

  return objDate;
}

function type2digit(num) {
  return `0${num}`;
}
