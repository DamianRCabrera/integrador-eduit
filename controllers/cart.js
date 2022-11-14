import ApiProducts from "../api/products.js";
import ApiCart from "../api/cart.js";

const apiProducts = new ApiProducts();
const apiCart = new ApiCart();

class ControllerCart {
  async displayProducts(req, res) {
    const { productsID } = req.body;

    const allProducts = await apiProducts.getProducts();

    const products = productsID.reduce((acc, curr) => {
      const product = allProducts.find((product) => product.id == curr.id);
      product && acc.push(product);
      return acc;
    }, []);

    res.render("partials/partials/cart", { products, layout: false });
  }

  async getCarts(req, res) {
    res.json(await apiCart.getCarts());
  }

  async getCart(req, res) {
    const id = req.params.id;
    res.json(await apiCart.getCart(id));
  }

  async postCart(req, res) {
    const cart = req.body;
    const newCart = await apiCart.createCart(cart);
    res.json(newCart);
  }

  async putCart(req, res) {
    const id = req.params.id;
    const cart = req.body;
    const updatedCart = await apiCart.updateCart(id, cart);
    res.json(updatedCart);
  }

  async deleteCart(req, res) {
    const id = req.params.id;
    const removedCart = await apiCart.deleteCart(id);
    res.json(removedCart);
  }
}

export default ControllerCart;
