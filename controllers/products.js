import ApiProducts from "../api/products.js";

const api = new ApiProducts();

class ControllerProducts {
  async getProducts() {
    const products = await api.getProducts();
    return products;
  }

  async getProductById(id) {
    const product = await api.getProductById(id);
    return product;
  }
}

export default ControllerProducts;
