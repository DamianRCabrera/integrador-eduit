import ModelProducts from "../models/products.js";

const model = new ModelProducts();

class ApiProducts {
  async getProducts() {
    const products = await model.readProducts();
    return products;
  }
}

export default ApiProducts;
