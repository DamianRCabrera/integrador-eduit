import ApiProducts from "../api/products.js";

const api = new ApiProducts();

class ControllerProducts {
  async getProducts() {
    const products = await api.getProducts();
    return products;
  }
}

export default ControllerProducts;
