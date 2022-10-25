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
    const productAgeFormat = document.getElementById("product-age-format");

    const productImage = document.getElementById("product-image");

    const formAddProduct = document.getElementById("form-add-product");

    const regExpProductName = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,30}$/;
    const regExpProductBrand = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,40}$/;
    const regExpProductPrice = /^(?![0])\d{1,7}([\.]\d{1,2})?$/;
    const regExpProductStock = /^\d{1,8}$/;
    const regExpProductCategory = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,50}$/;
    const regExpProductShortDescription = /^.{3,80}$/;
    const regExpProductLongDescription = /^.{3,2000}$/;
    const regExpProductAgeYears = /^(?![0])\d{1,2}$/;

    const regExpProductAgeMonths = /^([0-1][0-8]|(\d))$/;

    if (formAddProduct) {
      formAddProduct.addEventListener("change", (e) => {
        if (e.target.id === "product-name") {
          validation.displayPopUpError(
            e,
            regExpProductName,
            "El nombre del producto debe contener entre 3 y 30 caracteres"
          );
          return;
        } else if (e.target.id === "product-brand") {
          validation.displayPopUpError(
            e,
            regExpProductBrand,
            "La marca del producto debe contener entre 3 y 40 caracteres."
          );
          return;
        } else if (e.target.id === "product-price") {
          validation.displayPopUpError(
            e,
            regExpProductPrice,
            "El precio debe contener entre 1 y 7 números, solo el punto es permitido."
          );
          return;
        } else if (e.target.id === "product-stock") {
          validation.displayPopUpError(
            e,
            regExpProductStock,
            "El stock del producto debe contener entre 1 y 8 números, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-category") {
          validation.displayPopUpError(
            e,
            regExpProductCategory,
            "La categoría del producto debe contener entre 3 y 50 caracteres."
          );
          return;
        } else if (e.target.id === "product-short-description") {
          validation.displayPopUpError(
            e,
            regExpProductShortDescription,
            "La descripción corta del producto debe contener entre 3 y 80 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-long-description") {
          validation.displayPopUpError(
            e,
            regExpProductLongDescription,
            "La descripción larga del producto debe contener entre 3 y 2000 caracteres, sin caracteres especiales."
          );
          return;
        } else if (e.target.id === "product-age-from") {
          if (productAgeFormat.value == "years") {
            validation.displayPopUpError(
              e,
              regExpProductAgeYears,
              "La edad debe contener entre 1 y 2 números"
            );
            return;
          } else if (productAgeFormat.value == "months") {
            validation.displayPopUpError(
              e,
              regExpProductAgeMonths,
              "La edad en meses debe ser como máximo 18"
            );
            return;
          }
        } else if (e.target.id === "product-age-to") {
          if (productAgeFormat.value == "years") {
            validation.displayPopUpError(
              e,
              regExpProductAgeYears,
              "La edad debe contener entre 1 y 2 números"
            );
            return;
          } else if (productAgeFormat.value == "months") {
            validation.displayPopUpError(
              e,
              regExpProductAgeMonths,
              "La edad en meses debe ser como máximo 18"
            );
            return;
          }
        } else {
          return;
        }
      });

      formAddProduct.addEventListener("submit", (e) => {
        e.preventDefault();
        if (
          validation.validate(productName.value, regExpProductName) &&
          validation.validate(productBrand.value, regExpProductBrand) &&
          validation.validate(productPrice.value, regExpProductPrice) &&
          validation.validate(productStock.value, regExpProductStock) &&
          validation.validate(productCategory.value, regExpProductCategory) &&
          validation.validate(
            productShortDescription.value,
            regExpProductShortDescription
          ) &&
          validation.validate(
            productLongDescription.value,
            regExpProductLongDescription
          ) &&
          ((validation.validate(productAgeFrom.value, regExpProductAgeYears) &&
            validation.validate(productAgeTo.value, regExpProductAgeYears)) ||
            (validation.validate(
              productAgeFrom.value,
              regExpProductAgeMonths
            ) &&
              validation.validate(productAgeTo.value, regExpProductAgeMonths)))
        ) {
          alert("El producto se ha agregado correctamente.");
          return;
        } else {
          alert("Por favor, complete todos los campos correctamente.");
          return;
        }
      });
    }
  },
};

export default alta;
