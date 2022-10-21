const validation = (value, regExp) => {
  return regExp.test(value);
};

const clearInput = (e) => {
  if (e.target.value === "") {
    e.target.style.backgroundImage = "none";
    e.target.style.backgroundColor = "#ffffff";
    removeAllPopUps();
    return true;
  }
  return false;
};

const createError = (msg, errName = "", popup = "") => {
  let error = new Error(msg);
  error.name = errName;
  error.popup = popup;
  return error;
};

const trimValue = (ev) => {
  ev.target.value = ev.target.value.trim();
};

const displayWarningError = (ev, err) => {
  let divError = document.createElement("div");
  divError.classList.add("error-display__popup");
  divError.innerHTML = err.message;
  ev.target.insertAdjacentElement("afterend", divError);
  return divError;
};

const removeAllPopUps = () => {
  let popUps = document.querySelectorAll(".error-display__popup");
  popUps.forEach((popup) => popup.remove());
};

const displayCheckOnInput = (ev) => {
  ev.target.classList.remove("input__error");
  ev.target.classList.add("input__check");
};

const modifyInputBackgroundOnError = (ev) => {
  ev.target.classList.remove("input__check");
  ev.target.classList.add("input__error");
};

const displayPopUpError = (e, regExp, errMsg) => {
  if (clearInput(e)) {
    return;
  }

  trimValue(e);

  if (validation(e.target.value, regExp) || e.target.value === "") {
    displayCheckOnInput(e);
    e.target.parentElement.querySelector(".error-display__popup")?.remove();
    return true;
  } else {
    modifyInputBackgroundOnError(e);
    if (
      e.target.parentElement.querySelector(".error-display__popup") === null
    ) {
      let error = createError(errMsg);
      displayWarningError(e, error);
    }
    return false;
  }
};

export default {
  validation,
  clearInput,
  createError,
  trimValue,
  displayWarningError,
  removeAllPopUps,
  displayCheckOnInput,
  modifyInputBackgroundOnError,
  displayPopUpError,
};
