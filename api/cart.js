import config from "../config.js";
import Model from "../models/cart.js";

const model = new Model();

class ApiCart {
  async getCarts() {
    const cart = await model.readCarts();
    return cart;
  }

  async getCart() {
    const cart = await model.readCart();
    return cart;
  }

  async createCart(cart) {
    const createdCart = await model.createCart(cart);
    return createdCart;
  }

  async updateCart(id, cart) {
    const updatedCart = await model.updateCart(id, cart);
    return updatedCart;
  }

  async deleteCart(id) {
    const removedCart = await model.deleteCart(id);
    return removedCart;
  }

}

export default ApiCart;
