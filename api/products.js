import Model from "../models/products.js";

const model = new Model();

class ApiProducts {
  async getProducts() {
    const products = await model.readProducts();
    return products;
  }

  async getProduct(id) {
    const product = await model.readProduct(id);
    return product;
  }

  async createProduct(product) {
    const createdProduct = await model.createProduct(product);
    return createdProduct;
  }

  async updateProduct(id, product) {
    const updatedProduct = await model.updateProduct(id, product);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const removedProduct = await model.deleteProduct(id);
    return removedProduct;
  }
}

export default ApiProducts;
