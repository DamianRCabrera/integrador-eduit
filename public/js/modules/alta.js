// import Validation from "../services/validation.js";
// import e from "cors";
import productController from "../controllers/product.js";

// const validation = new Validation();

class PageAlta {
  static productsTableContainer;
  static productForm;
  static fields;
  static btnCreate;
  static btnUpdate;
  static btnCancel;

  static validators = {
    id: /^[\da-f]{24}$/,
    name: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s0-9\.\,"'\/\-_]{3,30}$/,
    brand: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,40}$/,
    price: /^(?![0])\d{1,7}([\.]\d{1,2})?$/,
    stock: /^\d{1,8}$/,
    category: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s\.\,"'\/\-_]{3,50}$/,
    shortDescription: /.{3,80}/,
    longDescription: /.{3,2000}/,
    ageYears: /^(?![0])\d{1,2}$/,
    ageMonths: /^([0-1][0-8]|(\d))$/,
    ageTo: /./,
    ageFrom: /./,
    ageFormat: /./,
  };

  static errorMsg = {
    name: "El nombre debe tener entre 3 y 30 caracteres.",
    brand: "La marca debe tener entre 3 y 40 caracteres.",
    price: "El precio debe ser un número entero o decimal entre 1 y 9999999.",
    stock: "El stock debe ser un número entero entre 1 y 99999999.",
    category: "La categoría debe tener entre 3 y 50 caracteres.",
    shortDescription:
      "La descripción corta debe tener entre 3 y 80 caracteres.",
    longDescription:
      "La descripción larga debe tener entre 3 y 2000 caracteres.",
    ageYears: "La edad en años debe ser un número entero entre 1 y 99.",
    ageMonths: "La edad en meses debe ser un número entero entre 0 y 18.",
    ageTo: "La edad máxima debe ser mayor o igual a la edad mínima.",
    ageFrom: "La edad mínima debe ser menor o igual a la edad máxima.",
  };

  static async deleteProduct(e) {
    if (!confirm("¿Estás seguro de querer eliminar el producto?")) {
      return false;
    }
    const row = e.target.closest("tr");
    const id = row.querySelector('td[data-product-property="id"]').innerHTML;
    console.log(id);
    const deletedProduct = await productController.deleteProduct(id);
    PageAlta.loadTable();
    console.log(deletedProduct);
    return deletedProduct;
  }

  static async getProduct(id) {
    const productToEdit = await productController.getProduct(id);
    console.log("productToEdit:", productToEdit);
    return productToEdit;
  }

  static emptyForm() {
    PageAlta.fields.forEach((field) => {
      if (field.type == "checkbox") {
        field.checked = false;
        return;
      }
      field.value = "";
    });
  }

  static async completeForm(e) {
    const id = e.target.dataset.id;
    const productToEdit = await PageAlta.getProduct(id);

    PageAlta.fields.forEach((field) => {
      if (field.type == "checkbox") {
        field.checked = productToEdit[field.name];
        return;
      } else if (field.type == "file") {
        return;
      }
      field.value = productToEdit[field.name];
    });
  }

  static async addTableEvents() {
    PageAlta.productsTableContainer.addEventListener("click", async (e) => {
      if (e.target.classList.contains("products-table__body__btn__delete")) {
        const deletedProduct = await PageAlta.deleteProduct(e);
        console.log("deletedProduct:", deletedProduct);
        if (PageAlta.objectIsEmpty(deletedProduct)) {
          console.error("No se pudo eliminar el producto");
        }
        return;
      }
      if (e.target.classList.contains("products-table__body__btn__edit")) {
        PageAlta.prepareFormForEditing();
        PageAlta.completeForm(e);
        return;
      }
    });
  }

  static async renderTemplateTable() {
    const table = await fetch("/api/table").then((r) => r.text());
    PageAlta.productsTableContainer.innerHTML = table;
  }

  static async loadTable() {
    const products = await productController.getProducts();
    console.log(`Se encontraron ${products.length} productos.`);
    PageAlta.renderTemplateTable(products);
  }

  static async prepareTable() {
    PageAlta.productsTableContainer = document.querySelector(
      ".products-table-container"
    );
    await PageAlta.loadTable();
    PageAlta.addTableEvents();
  }

  static prepareFormForEditing() {
    PageAlta.productForm.querySelector('[name]:not([name="id"])').focus();
    PageAlta.btnCreate.disabled = true;
    PageAlta.btnUpdate.disabled = false;
    PageAlta.btnCancel.disabled = false;
  }

  static prepareFormForCreating() {
    PageAlta.btnCreate.disabled = false;
    PageAlta.btnUpdate.disabled = true;
    PageAlta.btnCancel.disabled = true;
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

  static removeAllPopUps() {
    const popUps = document.querySelectorAll(".error-display__popup");
    popUps.forEach((popup) => popup.remove());
  }

  static displayCheckOnInput(field) {
    if(field.classList.contains("input__error")){
      field.classList.remove("input__error");
    }
    field.classList.add("input__check");
  }

  static modifyInputBackgroundOnError(field) {
    field.classList.remove("input__check");
    field.classList.add("input__error");
  }

  static removeErrorsOnInput() {
    PageAlta.fields.forEach((field) => {
      if (field.classList.contains("input__error")) {
        field.classList.remove("input__error");
      }
    });
  }

  static validateForm(validators) {
    let allValidated = true;
    const productToSave = new FormData();
    console.log("\n\n");

    for (const field of PageAlta.fields) {
      if (!validators[field.name]) {
        if (field.type == "checkbox") {
          productToSave.append(field.name, field.checked);
        } else if (field.type == "file") {
          productToSave.append(field.name, field.files[0]);
          console.log(field.files[0]);
        }
        continue;
      }
      let validated = true;
      if (field.name == "ageFrom" || field.name == "ageTo") {
        if (document.getElementById("product-ageFormat").value == "years") {
          validated = PageAlta.validate(field.value, validators.ageYears);
        } else if (
          document.getElementById("product-ageFormat").value == "months"
        ) {
          validated = PageAlta.validate(field.value, validators.ageMonths);
        }
      } else {
        validated = PageAlta.validate(field.value, validators[field.name]);
        if (!validated) {
          if (
            field.parentElement.querySelector(".error-display__popup") === null
          ) {
            PageAlta.displayWarningError(field, PageAlta.errorMsg[field.name]);
            PageAlta.modifyInputBackgroundOnError(field);
          }
        }
      }
      
      if (!validated) {
        field.focus();
        allValidated = false;
        break;
      } else {
        PageAlta.displayCheckOnInput(field);
        PageAlta.removeErrorsOnInput();
        field.parentElement.querySelector(".error-display__popup")?.remove();
        productToSave.append(field.name, field.value);
      }
    }
    console.log("allValidated:", allValidated);
    if (!allValidated) {
      return false;
    }
    PageAlta.removeAllPopUps();
    return productToSave;
  }

  static async saveProduct(product) {
    const savedProduct = await productController.saveProduct(product);
    return savedProduct;
  }

  static async updateProduct(product) {
    const updatedProduct = await productController.updateProduct(
      product.id,
      product
    );
    return updatedProduct;
  }

  static async addFormEvents() {
    PageAlta.btnCreate.addEventListener("click", async (e) => {
      console.error("btn-create");
      const validators = { ...PageAlta.validators };
      delete validators.id;
      const productToSave = PageAlta.validateForm(validators);
      if (productToSave) {
        const savedProduct = await fetch("/api/products/", {
          method: "POST",
          body: productToSave,
        }).then((r) => r.json());
        console.log("savedProduct:", savedProduct);
        if (PageAlta.objectIsEmpty(savedProduct)) {
          console.error("No se pudo crear el producto");
          return;
        }
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageAlta.renderTemplateTable(products);

        PageAlta.emptyForm();
      }
    });

    PageAlta.btnUpdate.addEventListener("click", async (e) => {
      console.error("btn-update");
      const productToSave = PageAlta.validateForm(PageAlta.validators);
      console.log()
      if (productToSave) {
        const updatedProduct = await PageAlta.updateProduct(productToSave);
        console.log("updatedProduct:", updatedProduct);
        if (PageAlta.objectIsEmpty(updatedProduct)) {
          console.error("No se pudo guardar el producto");
          return;
        }
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageAlta.renderTemplateTable(products);
        PageAlta.emptyForm();
        PageAlta.prepareFormForCreating();
      }
    });

    PageAlta.btnCancel.addEventListener("click", (e) => {
      console.error("btn-cancel");
      PageAlta.removeAllPopUps();
      PageAlta.removeErrorsOnInput();
      PageAlta.emptyForm();
      PageAlta.prepareFormForCreating();
    });

    PageAlta.addChangeEventForm();
  }

  static objectIsEmpty(object) {
    return Object.entries(object).length === 0;
  }

  static addChangeEventForm() {
    PageAlta.fields.forEach((field) => {
      field.addEventListener("change", (e) => {
        if (PageAlta.validate(e.target.value, PageAlta.validators[e.target.name])) {
          PageAlta.displayCheckOnInput(e);
          PageAlta.removeErrorsOnInput();
          e.target.parentElement
            .querySelector(".error-display__popup")
            ?.remove();
        } else {
          PageAlta.displayWarningError(
            e.target,
            PageAlta.errorMsg[e.target.name]
          );
          PageAlta.modifyInputBackgroundOnError(e.target);
        }
      });
    });
  }

  static prepareForm() {
    PageAlta.productForm = document.getElementById("form-add-product");
    PageAlta.fields = PageAlta.productForm.querySelectorAll("[name]");
    PageAlta.btnCreate = document.getElementById("product-add");
    PageAlta.btnUpdate = document.getElementById("product-edit");
    PageAlta.btnCancel = document.getElementById("product-reset");
    PageAlta.addFormEvents();
  }

  static async init() {
    console.log("PageAlta.init()");

    PageAlta.prepareTable();
    PageAlta.prepareForm();
  }
}

export default PageAlta;
