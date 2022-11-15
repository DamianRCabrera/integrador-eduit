class CartItem {
  constructor(id, price) {
    this.id = id;
    this.price = price;
    this.quantity = 1;
    this.subtotal = price;
    this.favourite = false;
  }

  updateSubtotal() {
    this.subtotal = this.price * this.quantity;
  }

  addOne() {
    this.quantity++;
    this.updateSubtotal();
  }

  discountOne() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateSubtotal();
    }
  }
}

class ShopCart {
  static url = "/api/cart/";

  constructor() {
    this.client = "Anonymous";
    this.cartIDs = {
      productsID: [{}],
    };
    this.cart = {};
    this.total = 0;
    this.itemsOnCart = 0;
  }

  async ajax(url, method, body) {
    return await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.text());
  }

  async getProductFromApi(id) {
    console.log(id);
    const url = `/api/products/`;
    const product = await fetch(`${url}/${id}`).then((res) => res.json());
    return product;
  }

  async addProductToCart(id) {
    if (!this.cart[id]) {
      this.cartIDs.productsID.push({ id: id });
      const product = await this.getProductFromApi(id);
      this.cart[id] = new CartItem(id, product.price);
    } else {
      this.cart[id].addOne();
    }
  }

  async loadProductToCart() {
    const container = document.querySelector(".shopping-cart-item-container");
    const ids = JSON.stringify(this.cartIDs);
    const viewContent = await this.ajax(ShopCart.url, "post", ids);
    container.innerHTML = viewContent;
  }

  async sendCartToApi() {
    const newCart = {};
    newCart.client = this.client;
    newCart.date = Date.now();
    newCart.products = this.cart;
    newCart.total = this.total;

    const response = await this.ajax(
      `${ShopCart.url}new`,
      "post",
      JSON.stringify(newCart)
    );
    return response;
  }

  async renderProductsToCart() {
    await this.loadProductToCart();
  }

  displaySubtotal(id) {
    const subtotal = document.querySelector(`[data-subtotal-id="${id}"]`);
    subtotal.innerHTML = this.cart[id].subtotal;
  }

  displaySubtotals() {
    for (let id in this.cart) {
      this.displaySubtotal(id);
    }
  }

  displayQuantity(id) {
    const quantity = document.querySelector(`[data-quantity-id="${id}"]`);
    quantity.value = this.cart[id].quantity;
  }

  displayQuantities() {
    for (let id in this.cart) {
      this.displayQuantity(id);
    }
  }

  updateTotal() {
    const total = document.getElementById("shopping-cart__total");
    let accumulator = 0;
    for (let id in this.cart) {
      accumulator += this.cart[id].subtotal;
    }
    this.total = accumulator;
    total.innerHTML = this.total;
  }

  getNumberOfItemsInCartBubble() {
    let accumulator = 0;
    for (let id in this.cart) {
      accumulator += this.cart[id].quantity;
    }
    this.itemsOnCart = accumulator;
    return this.itemsOnCart;
  }

  displayNumberOfItemsInCartBubble() {
    const cartBubble = document.getElementById("cart-bubble");
    let itemsOnCart = this.getNumberOfItemsInCartBubble();

    if (itemsOnCart > 0) {
      cartBubble.style.display = "flex";
      cartBubble.innerHTML = itemsOnCart;
    } else {
      cartBubble.style.display = "none";
    }
  }

  updateQuantityAndSubtotal(id) {
    this.displaySubtotal(id);
    this.displayQuantity(id);
    this.updateTotal();
    this.displayNumberOfItemsInCartBubble();
  }

  updateQuantitiesSubtotalsAndBubble() {
    this.displaySubtotals();
    this.displayQuantities();
    this.updateTotal();
    this.displayNumberOfItemsInCartBubble();
  }

  async init() {
    await this.renderProductsToCart();
    const modalCheckbox = document.getElementById("main-nav-cart");
    document.addEventListener("click", async (e) => {
      if (modalCheckbox.checked) {
        if (e.target.className.includes("main-cart-toggle")) {
          return;
        } else if (e.target.className.includes("shopping-cart__close__image")) {
          modalCheckbox.checked = false;
          return;
        } else if (!e.target.className.includes("shopping-cart")) {
          e.preventDefault();
          modalCheckbox.checked = false;
          return;
        } else if (
          e.target.className.includes("shopping-cart__item__quantity__plus")
        ) {
          let id = e.target.dataset.id;
          this.cart[id].addOne();
          this.updateQuantityAndSubtotal(id);
        } else if (
          e.target.className.includes("shopping-cart__item__quantity__minus")
        ) {
          let id = e.target.dataset.id;
          this.cart[id].discountOne();
          this.updateQuantityAndSubtotal(id);
        } else if (
          e.target.className.includes("shopping-cart__item__buttons__like")
        ) {
          e.target.classList.toggle("like-is-active");
          let id = e.target.getAttribute("data-fav-id");
          this.cart[id].favourite = !this.cart[id].favourite;
        } else if (
          e.target.className.includes("shopping-cart__item__buttons__delete")
        ) {
          const id = e.target.getAttribute("data-delete-id");
          delete this.cart[id];
          const index = this.cartIDs.productsID.findIndex(
            (obj) => obj.id === id
          );
          this.cartIDs.productsID.splice(index, 1);
          this.displayNumberOfItemsInCartBubble();
          await this.renderProductsToCart();
          if (this.cartIDs.productsID.length > 1) {
            this.updateQuantitiesSubtotalsAndBubble();
          }
        } else if (e.target.dataset.buy == "true") {
          e.preventDefault();
          const response = await this.sendCartToApi();
          if (response) {
            console.log(response);
            this.cart = {};
            this.cartIDs = { productsID: [] };
            this.total = 0;
            this.itemsOnCart = 0;
            this.displayNumberOfItemsInCartBubble();
            await this.renderProductsToCart();
          }
        }
      } else if (e.target.className.includes("card__link-add")) {
        e.preventDefault();
        const btn = e.target;
        btn.innerHTML = "Agregado";
        setTimeout(() => {
          btn.innerHTML = "Agregar";
        }, 2000);
        const id = e.target.getAttribute("data-id");
        await this.addProductToCart(id);
        await this.renderProductsToCart();
        this.updateQuantitiesSubtotalsAndBubble();
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
  }
}

const shopCart = new ShopCart();

shopCart.init();
