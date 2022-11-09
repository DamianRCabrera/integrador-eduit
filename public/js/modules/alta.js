// import Validation from "../services/validation.js";
import productController from "../controllers/product.js";

// const validation = new Validation();

class PageAlta {
  static productsTableContainer;
  static productForm;
  static fields;
  static btnCreate;
  static btnUpdate;
  static btnCancel;

  //sirve

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

  //sirve

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

  // sirve

  static async getProduct(id) {
    const productToEdit = await productController.getProduct(id);
    console.log("productToEdit:", productToEdit);
    return productToEdit;
  }

  // sirve

  static emptyForm() {
    PageAlta.fields.forEach((field) => {
      if (field.type == "checkbox") {
        field.checked = false;
        return;
      }
      field.value = "";
    });
  }

  // sirve

  static async completeForm(e) {
    const id = e.target.dataset.id;
    const productToEdit = await PageAlta.getProduct(id);

    PageAlta.fields.forEach((field) => {
      if (field.type == "checkbox") {
        field.checked = productToEdit[field.name];
        return;
      }
      field.value = productToEdit[field.name];
    });
  }

  // sirve

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

  //sirve

  static async renderTemplateTable(products) {
    const table = await fetch("/api/table").then((r) => r.text());
    PageAlta.productsTableContainer.innerHTML = table;
  }

  //sirve

  static async loadTable() {
    const products = await productController.getProducts();
    console.log(`Se encontraron ${products.length} productos.`);
    PageAlta.renderTemplateTable(products);
  }

  //sirve

  static async prepareTable() {
    PageAlta.productsTableContainer = document.querySelector(
      ".products-table-container"
    );
    await PageAlta.loadTable();
    PageAlta.addTableEvents();
  }

  //sirve

  static prepareFormForEditing() {
    PageAlta.productForm.querySelector('[name]:not([name="id"])').focus();
    PageAlta.btnCreate.disabled = true;
    PageAlta.btnUpdate.disabled = false;
    PageAlta.btnCancel.disabled = false;
  }

  //sirve

  static prepareFormForCreating() {
    PageAlta.btnCreate.disabled = false;
    PageAlta.btnUpdate.disabled = true;
    PageAlta.btnCancel.disabled = true;
  }

  static validate(value, validator) {
    return validator.test(value);
  }

  static validateForm(validators) {
    let allValidated = true;
    const productToSave = new FormData;
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
      }
      console.warn(field.name);
      console.log(
        `value: ${field.value}\nvalidator: ${
          validators[field.name]
        }\nvalidated: ${validated}`
      );
      if (!validated) {
        field.focus();
        allValidated = false;
        break;
      } else {
        productToSave.append(field.name, field.value);
      }
    }
    console.log("allValidated:", allValidated);
    if (!allValidated) {
      return false;
    }
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
      // console.log(validators);
      // console.log(PageAlta.validators);
      const productToSave = PageAlta.validateForm(validators);
      console.log("productToSave:", productToSave);
      if (productToSave) {
        const savedProduct = await fetch("/api/products/",{
          method: "POST",
          body: productToSave
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
      PageAlta.emptyForm();
      PageAlta.prepareFormForCreating();
    });
  }

  static objectIsEmpty(object) {
    return Object.entries(object).length === 0;
  }

  static prepareForm() {
    PageAlta.productForm = document.getElementById("form-add-product");
    PageAlta.fields = PageAlta.productForm.querySelectorAll("[name]");
    PageAlta.btnCreate = document.getElementById("product-add");
    console.log(PageAlta.btnCreate);
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
