import regExpValidator from '../../src/modules/validation.js';

const alta = {
  init: function altaValidation() {
    console.log("Ejecutando modulo de page: alta");

    const productName = document.getElementById("product-name");
    const productBrand = document.getElementById("product-brand");
    const productPrice = document.getElementById("product-price");
    const productStock = document.getElementById("product-stock");
    const productCategory = document.getElementById("product-category");
    const productShortDescription = document.getElementById(
      "product-short-description"
    );
    const productLongDescription = document.getElementById(
      "product-long-description"
    );
    const productAgeFrom = document.getElementById("product-age-from");
    const productAgeTo = document.getElementById("product-age-to");
    const productFreeShipping = document.getElementById(
      "product-free-shipping"
    );
    const productImage = document.getElementById("product-image");

    const formAddProduct = document.getElementById("form-add-product");

    const regExpProductName =
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{3,60}$/;
    const regExpProductBrand =
      /^[A-Za-z\dÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ!ç&\s\.\,\-\(\)\'\"\°\/]{3,50}$/;
    const regExpProductPrice = /^(?![0])\d{1,7}([\.]\d{1,2})?$/;
    const regExpProductStock = /^(?![0])\d{1,5}$/;
    const regExpProductCategory =
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][\s\.A-ZÁÉÍÓÚÑÜa-záéíóúñü\-\/]{3,25})$/;
    const regExpProductShortDescription =
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{20,80}$/;
    const regExpProductLongDescription =
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,300}$/;
    const regExpProductAgeFrom = /^(?![0])\d{1,2}$/;
    const regExpProductAgeTo = /^(?![0])\d{1,2}$/;

    if (formAddProduct) {
      formAddProduct.addEventListener("change", (e) => {
        if (e.target.id === "product-name") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductName,
            "El nombre del producto debe contener entre 2 y 60 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-brand") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductBrand,
            "La marca del producto debe contener entre 3 y 50 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-price") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductPrice,
            "El precio del producto debe contener entre 1 y 7 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-stock") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductStock,
            "El stock del producto debe contener entre 1 y 5 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-category") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductCategory,
            "La categoría del producto debe contener entre 3 y 25 caracteres, sin números ni caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-short-description") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductShortDescription,
            "La descripción corta del producto debe contener entre 20 y 80 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-long-description") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductLongDescription,
            "La descripción larga del producto debe contener entre 30 y 300 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-age-from") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductAgeFrom,
            "La edad mínima del producto debe contener entre 1 y 2 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-age-to") {
          regExpValidator.displayPopUpError(
            e,
            regExpProductAgeTo,
            "La edad máxima del producto debe contener entre 1 y 2 números, sin caracteres especiales."
          );
          return;
        } else {
          return;
        }
      });

      formAddProduct.addEventListener("submit", (e) => {
        if (
          regExpValidator.validation(productName.value, regExpProductName) &&
          regExpValidator.validation(productBrand.value, regExpProductBrand) &&
          regExpValidator.validation(productPrice.value, regExpProductPrice) &&
          regExpValidator.validation(productStock.value, regExpProductStock) &&
          regExpValidator.validation(productCategory.value, regExpProductCategory) &&
          regExpValidator.validation(
            productShortDescription.value,
            regExpProductShortDescription
          ) &&
          regExpValidator.validation(
            productLongDescription.value,
            regExpProductLongDescription
          ) &&
          regExpValidator.validation(productAgeFrom.value, regExpProductAgeFrom) &&
          regExpValidator.validation(productAgeTo.value, regExpProductAgeTo)
        ) {
          alert("El producto se ha agregado correctamente.");
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

export default alta;