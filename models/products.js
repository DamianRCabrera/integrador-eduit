import products from "../public/src/database/database.js";
import Producto from "../public/src/modules/productfactory.js";

class ModelProducts {
  async createProduct(product) {
    let newProduct = await new Producto(
      product.id,
      product.name,
      product.shortDescription,
      product.image,
      product.price
    );
    products.push(newProduct);
    return newProduct;
  }

  async readProducts() {
    return await products;
  }

  async readProduct(id) {
    return (await products.find((product) => product.id == id)) || {};
  }

  updateProduct(id, product) {
    product.id = id;
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return {};
    }
    products[index] = product;
    return product;
  }

  deleteProduct(id) {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return {};
    }

    const removedProduct = products.splice(index, 1)[0];
    return removedProduct;
  }
}

export default ModelProducts;
