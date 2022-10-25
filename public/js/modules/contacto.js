import Validation from "../../src/modules/validation.js";

const validation = new Validation();

const contacto = {
  init: function validationContacto() {
    console.log("Ejecutando modulo de page: contacto");

    const userName = document.getElementById("user-name");
    const userLastName = document.getElementById("user-lastname");
    const userTelephone = document.getElementById("user-telephone");
    const userComment = document.getElementById("user-comment");

    const formAddComment = document.getElementById("form-add-comment");

    const regExpUserName =
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,15})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,15})?$/;
    const regExpUserLastName =
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$/;
    const regExpTelephone =
      /^(\\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])([0-9]{4}|[0-9]{3})([0-9]{4})$/;
    const regExpUserComment =
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{12,300}$/;

    if (formAddComment) {
      formAddComment.addEventListener("change", (e) => {
        if (e.target.id === "user-name") {
          validation.displayPopUpError(
            e,
            regExpUserName,
            "El nombre debe contener entre 3 y 20 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-lastname") {
          validation.displayPopUpError(
            e,
            regExpUserLastName,
            "El apellido debe contener entre 3 y 20 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-telephone") {
          validation.displayPopUpError(
            e,
            regExpTelephone,
            "El teléfono debe contener entre 8 y 15 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-comment") {
          validation.displayPopUpError(
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
        e.preventDefault();
        if (
          validation.validate(userName.value, regExpUserName) &&
          validation.validate(userLastName.value, regExpUserLastName) &&
          validation.validate(userTelephone.value, regExpTelephone) &&
          validation.validate(userComment.value, regExpUserComment)
        ) {
          alert("El mensaje se ha enviado correctamente.");
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
