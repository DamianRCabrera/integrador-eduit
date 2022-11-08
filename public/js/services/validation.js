class Validation {
  validate(value, regExp) {
    return regExp.test(value);
  }

  clearInput(e) {
    if (e.target.value === "") {
      e.target.classList.remove("input__error");
      e.target.classList.remove("input__check");
      this.removeAllPopUps();
      return true;
    }
    return false;
  }
  createError(msg, errName = "", popup = "") {
    const error = new Error(msg);
    error.name = errName;
    error.popup = popup;
    return error;
  }

  trimValue(ev) {
    ev.target.value = ev.target.value.trim();
  }

  displayWarningError(ev, err) {
    const divError = document.createElement("div");
    divError.classList.add("error-display__popup");
    divError.innerHTML = err.message;
    ev.target.insertAdjacentElement("afterend", divError);
    return divError;
  }

  removeAllPopUps() {
    const popUps = document.querySelectorAll(".error-display__popup");
    popUps.forEach((popup) => popup.remove());
  }

  displayCheckOnInput(ev) {
    ev.target.classList.remove("input__error");
    ev.target.classList.add("input__check");
  }

  modifyInputBackgroundOnError(ev) {
    ev.target.classList.remove("input__check");
    ev.target.classList.add("input__error");
  }

  displayPopUpError(e, regExp, errMsg) {
    if (this.clearInput(e)) {
      return;
    }

    this.trimValue(e);

    if (this.validate(e.target.value, regExp) || e.target.value === "") {
      this.displayCheckOnInput(e);
      e.target.parentElement.querySelector(".error-display__popup")?.remove();
      return true;
    } else {
      this.modifyInputBackgroundOnError(e);
      if (
        e.target.parentElement.querySelector(".error-display__popup") === null
      ) {
        let error = this.createError(errMsg);
        this.displayWarningError(e, error);
      }
      return false;
    }
  }

  checkInput(evento, regExp, errMsg) {
    this.displayPopUpError(evento, regExp, errMsg);
    return;
  }
}

export default Validation;
