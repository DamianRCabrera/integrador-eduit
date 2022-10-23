import ModelProducts from "../models/products.js";

const model = new ModelProducts();

class ApiProducts {
  async getProducts() {
    const products = await model.readProducts();
    return products;
  }

  async getProductById(id) {
    const product = await model.readProduct(id);
    return product;
  }
}

export default ApiProducts;
