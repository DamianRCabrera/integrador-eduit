import regExpValidator from '../../src/modules/validation.js';

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

    if (formAddComment) {
      formAddComment.addEventListener("change", (e) => {
        if (e.target.id === "user-name") {
          regExpValidator.displayPopUpError(
            e,
            regExpUserName,
            "El nombre debe contener entre 3 y 20 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-lastname") {
          regExpValidator.displayPopUpError(
            e,
            regExpUserLastName,
            "El apellido debe contener entre 3 y 20 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-telephone") {
          regExpValidator.displayPopUpError(
            e,
            regExpTelephone,
            "El teléfono debe contener entre 8 y 15 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "user-comment") {
          regExpValidator.displayPopUpError(
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
          regExpValidator.validation(userName.value, regExpUserName) &&
          regExpValidator.validation(userLastName.value, regExpUserLastName) &&
          regExpValidator.validation(userTelephone.value, regExpTelephone) &&
          regExpValidator.validation(userComment.value, regExpUserComment)
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