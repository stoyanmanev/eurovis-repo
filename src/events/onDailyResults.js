export function setWorkingTime(wt, date){
    const cwt = `${wt.hour}:${wt.minutes}`;
    const row = document.getElementById(date);
    const el = Object.values(row.children).filter(x => x.attributes.type?.value === 'w-time');
    el[0].dataset.wtime = cwt;
    el[0].innerText = cwt;
}