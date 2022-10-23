import Validation from "../../src/modules/validation.js";

const validation = new Validation();

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
      /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,30}$/;
    const regExpProductBrand =
      /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,40}$/;
    const regExpProductPrice = /^(?![0])\d{1,7}([\.]\d{1,2})?$/;
    const regExpProductStock = /^\d{1,8}$/;
    const regExpProductCategory =
      /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,50}$/;
    const regExpProductShortDescription =
      /^.{3,80}$/;
    const regExpProductLongDescription =
      /^.{3,2000}$/;
    const regExpProductAgeFrom = /^(?![0])\d{1,2}$/;
    const regExpProductAgeTo = /^(?![0])\d{1,2}$/;

    if (formAddProduct) {
      formAddProduct.addEventListener("change", (e) => {
        if (e.target.id === "product-name") {
          validation.displayPopUpError(
            e,
            regExpProductName,
            "El nombre del producto debe contener entre 2 y 60 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-brand") {
          validation.displayPopUpError(
            e,
            regExpProductBrand,
            "La marca del producto debe contener entre 3 y 50 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-price") {
          validation.displayPopUpError(
            e,
            regExpProductPrice,
            "El precio del producto debe contener entre 1 y 7 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-stock") {
          validation.displayPopUpError(
            e,
            regExpProductStock,
            "El stock del producto debe contener entre 1 y 5 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-category") {
          validation.displayPopUpError(
            e,
            regExpProductCategory,
            "La categoría del producto debe contener entre 3 y 25 caracteres, sin números ni caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-short-description") {
          validation.displayPopUpError(
            e,
            regExpProductShortDescription,
            "La descripción corta del producto debe contener entre 20 y 80 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-long-description") {
          validation.displayPopUpError(
            e,
            regExpProductLongDescription,
            "La descripción larga del producto debe contener entre 30 y 300 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-age-from") {
          validation.displayPopUpError(
            e,
            regExpProductAgeFrom,
            "La edad mínima del producto debe contener entre 1 y 2 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-age-to") {
          validation.displayPopUpError(
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
          validation.validation(productName.value, regExpProductName) &&
          validation.validation(productBrand.value, regExpProductBrand) &&
          validation.validation(productPrice.value, regExpProductPrice) &&
          validation.validation(productStock.value, regExpProductStock) &&
          validation.validation(
            productCategory.value,
            regExpProductCategory
          ) &&
          validation.validation(
            productShortDescription.value,
            regExpProductShortDescription
          ) &&
          validation.validation(
            productLongDescription.value,
            regExpProductLongDescription
          ) &&
          validation.validation(
            productAgeFrom.value,
            regExpProductAgeFrom
          ) &&
          validation.validation(productAgeTo.value, regExpProductAgeTo)
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
