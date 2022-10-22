class ShopCart {
  constructor() {
    this.url = "http://localhost:8080/api/cart/";
    this.addedIds = new Set();
    this.cartIDs = {
      productsID: [],
    };
  }

  async ajax(url, method, ids) {
    return await fetch(url, { method: method, body: ids, headers: {
      'Content-Type': 'application/json'} }).then(
      (res) => res.text()
    );
  }

  async loadProductToCart() {
    console.log(JSON.stringify(this.cartIDs));
    const container = document.querySelector(".shopping-cart-item-container");
    let ids = JSON.stringify(this.cartIDs);
    const viewContent = await this.ajax(this.url, "post", ids);
    container.innerHTML = viewContent;
  }

  async addProductToCart(id) {
    this.addedIds.add(id);
    console.log("deberia agregar");

    this.cartIDs.productsID.push({ "id": id, quantity: 1 });
    await this.loadProductToCart();
  }

  init() {
    const modalCheckbox = document.getElementById("main-nav-cart");
    document.addEventListener("click", (e) => {
      if (modalCheckbox.checked) {
        if (e.target.className.includes("main-cart-toggle")) {
          return;
        } else if (e.target.className.includes("shopping-cart__close__image")) {
          modalCheckbox.checked = false;
          return;
        } else if (!e.target.className.includes("shopping-cart")) {
          modalCheckbox.checked = false;
          return;
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      if (modalCheckbox.checked) {
        if (event.key == "Escape") {
          modalCheckbox.checked = false;
          return;
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.className.includes("card__link-add")) {
        e.preventDefault();
        console.log("debug");
        const id = Number(e.target.getAttribute("data-id"));
        this.addProductToCart(id);
      }
    });
  }
}

const shopCart = new ShopCart();
shopCart.init();
