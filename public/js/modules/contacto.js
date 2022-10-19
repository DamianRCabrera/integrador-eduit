const contacto = {
  init: function validationContacto() {
    console.log('Ejecutando modulo de page: contacto')

    const userName = document.getElementById("user-name");
    const userLastName = document.getElementById("user-last-name");
    const userTelephone = document.getElementById("user-telephone");
    const userComment = document.getElementById("user-comment");

    const formAddComment = document.getElementById("form-add-comment");

    const regExpUserName =
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})?$/;
    const regExpUserLastName =
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$/;
    const regExpTelephone =
      /^(\\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])([0-9]{4}|[0-9]{3})([0-9]{4})$/;
    const regExpUserComment =
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{12,300}$/;

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
      ev.target.style.background =
        "url(./assets/img/check.svg) no-repeat right";
      ev.target.style.backgroundColor = "#ffffff";
      ev.target.style.backgroundSize = "1.2em";
      ev.target.style.backgroundPosition = "right 1.5em center";
    };

    const modifyInputBackgroundOnError = (e) => {
      e.target.style.backgroundColor = "#d63c40";
      e.target.style.backgroundImage = "none";
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

    if (formAddComment) {
      formAddComment.addEventListener("change", (e) => {
        if (e.target.id === "user-name") {
          displayPopUpError(
            e,
            regExpUserName,
            "El nombre debe contener entre 3 y 20 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-lastname") {
          displayPopUpError(
            e,
            regExpUserLastName,
            "El apellido debe contener entre 3 y 20 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-telephone") {
          displayPopUpError(
            e,
            regExpTelephone,
            "El teléfono debe contener entre 8 y 15 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-comment") {
          displayPopUpError(
            e,
            regExpUserComment,
            "El comentario debe contener entre 12 y 300 caracteres, sin caracteres especiales."
          );
          return;
        } else {
          return;
        }
      });

      formAddComment.addEventListener("submit", (e) => {
        if (
          validation(userName.value, regExpUserName) &&
          validation(userLastName.value, regExpUserLastName) &&
          validation(userTelephone.value, regExpTelephone) &&
          validation(userComment.value, regExpUserComment)
        ) {
          alert("El comentario se ha agregado correctamente.");
          return;
        } else {
          e.preventDefault();
          alert("Por favor, complete todos los campos correctamente.");
          return;
        }
      });
    }
  },
};

export default contacto;