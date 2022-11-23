class PageContacto {
  static contactContainer;
  static contactForm;
  static fields;
  static btnSubmit;

  static validators = {
    name: /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,15})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,15})?$/,
    lastName:
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{2,15})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{2,15}$)?$/,
    telephone:
      /^(\\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])([0-9]{4}|[0-9]{3})([0-9]{4})$/,
    message:
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{12,300}$/,
    email: /./,
  };

  static errorMsg = {
    name: "El nombre debe tener entre 3 y 30 caracteres, sin nros. ni carac. especiales",
    lastName:
      "El apellido debe tener entre 3 y 40 caracteres, sin nros. ni carac. especiales",
    telephone:
      "El teléfono debe tener entre 7 y 15 caracteres, sin nros. ni carac. especiales",
    message:
      "El mensaje debe tener entre 12 y 300 caracteres, sin nros. ni carac. especiales",
  };

  static emptyForm() {
    PageContacto.fields.forEach((field) => {
      if (field.type == "checkbox") {
        field.checked = false;
        return;
      }
      field.value = "";
    });
    PageContacto.removeAllChecks();
  }

  static createPopUp(message, result) {
    const popUp = document.createElement("div");
    popUp.classList.add("popup");
    popUp.classList.add(result ? "popup-success" : "popup-error");
    popUp.innerHTML = message;
    return popUp;
  }

  static removePopUp() {
    const popUps = document.querySelectorAll(".popup");
    setTimeout(() => {
      popUps.forEach((popUp) => popUp.remove());
    }, 2500);
  }

  static displayPopup(message, result) {
    const popUp = PageContacto.createPopUp(message, result);
    document.body.appendChild(popUp);
    PageContacto.removePopUp();
  }

  static validate(value, validator) {
    return validator.test(value);
  }

  static displayWarningError(field, msg) {
    const divError = document.createElement("div");
    divError.classList.add("error-display__popup");
    divError.innerHTML = msg;
    field.insertAdjacentElement("afterend", divError);
    return divError;
  }

  static modifyInputBackgroundOnError(field) {
    field.classList.remove("input__check");
    field.classList.add("input__error");
  }

  static removeAllPopUps() {
    const popUps = document.querySelectorAll(".error-display__popup");
    popUps.forEach((popup) => popup.remove());
  }

  static displayCheckOnInput(field) {
    if (field.classList.contains("input__error")) {
      field.classList.remove("input__error");
    }
    field.classList.add("input__check");
  }

  static objectIsEmpty(object) {
    return Object.entries(object).length === 0;
  }

  static removeAllChecks() {
    const checks = document.querySelectorAll(".input__check");
    checks.forEach((check) => check.classList.remove("input__check"));
  }

  static removeErrorsOnInput() {
    PageContacto.fields.forEach((field) => {
      if (field.classList.contains("input__error")) {
        field.classList.remove("input__error");
      }
    });
  }

  static validateForm(validators) {
    let allValidated = true;
    const messageToSave = new FormData();

    for (const field of PageContacto.fields) {
      let validated = PageContacto.validate(
        field.value,
        validators[field.name]
      );
      if (!validated) {
        if (
          field.parentElement.querySelector(".error-display__popup") === null
        ) {
          PageContacto.displayWarningError(
            field,
            PageContacto.errorMsg[field.name]
          );
          PageContacto.modifyInputBackgroundOnError(field);
        }
        field.focus();
        PageContacto.displayPopup("Faltan ingresar datos", false);
        allValidated = false;
        break;
      }
      PageContacto.displayCheckOnInput(field);
      PageContacto.removeErrorsOnInput();
      field.parentElement.querySelector(".error-display__popup")?.remove();
      messageToSave.append(field.name, field.value);
    }

    console.log("allValidated:", allValidated);

    if (!allValidated) {
      return false;
    }
    PageContacto.removeAllPopUps();
    return messageToSave;
  }

  static prepareForm() {
    PageContacto.contactForm = document.getElementById("form-add-comment");
    PageContacto.fields = PageContacto.contactForm.querySelectorAll("[name]");
    PageContacto.btnSubmit = document.getElementById("btn-submit");
    PageContacto.addFormEvents();
  }

  static async sendFormData(url, data) {
    const result = await fetch(url, { method: "POST", body: data }).then((r) =>
      r.json()
    );
    return result;
  }

  static addFormEvents() {
    PageContacto.btnSubmit.addEventListener("click", async (e) => {
      e.preventDefault();
      const validators = { ...PageContacto.validators };
      const messageToSave = PageContacto.validateForm(validators);
      if (messageToSave) {
        const savedMessage = await PageContacto.sendFormData(
          "/api/messages/",
          messageToSave
        );
        console.log("Mensaje enviado:", savedMessage);

        if (PageContacto.objectIsEmpty(savedMessage)) {
          console.error("Error al guardar el mensaje");
          PageContacto.displayPopup("El mensaje no se pudo enviar", false);
          return;
        }
        PageContacto.displayPopup("El mensaje se envió correctamente", true);
        PageContacto.emptyForm();
      }
    });
  }

  static addChangeEventForm() {
    PageContacto.fields.forEach((field) => {
      field.addEventListener("change", (e) => {
        if (
          PageContacto.validate(
            e.target.value,
            PageContacto.validators[e.target.name]
          )
        ) {
          PageContacto.displayCheckOnInput(e.target);
          e.target.parentElement
            .querySelector(".error-display__popup")
            ?.remove();
        } else {
          PageContacto.displayWarningError(
            e.target,
            PageContacto.errorMsg[e.target.name]
          );
          PageContacto.modifyInputBackgroundOnError(e.target);
        }
      });
    });
  }

  static async init() {
    console.log("PageContacto.init()");

    PageContacto.prepareForm();
    PageContacto.addChangeEventForm();
  }
}

export default PageContacto;
