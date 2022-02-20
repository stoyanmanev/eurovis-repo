export function getCurrentDateStartTime(e, name) {
    const parent = e.target.parentElement.parentElement;
    const arrChildren = parent.children;
    let res = "";
    Object.values(arrChildren).forEach((x) => {
      if (
        typeof x.attributes.type !== "undefined" &&
        x.attributes.type.value === name
      ) {
        res = x.outerText;
        return;
      }
    });
    return res;
  }