
const map = {
  submitResult: openResultForm,
  viewResult: viewResultForm,
}

export function handleClick(event) {
  if (typeof map[event.target.name] === "function") {
    map[event.target.name](event)
  }
}

function openResultForm(e){
  console.log(e)
}

function viewResultForm(e){
  console.log(e)
}


