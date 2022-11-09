import ApiProducts from "../api/products.js";

const api = new ApiProducts();

class ControllerProducts {
  async getProducts(req, res) {
    res.json(await api.getProducts());
  }

  async getProduct(req, res) {
    const id = req.params.id;
    res.json(await api.getProduct(id));
  }

  async postProduct(req, res) {
    const product = req.body;
    if (req.file) {
      product.image = `./assets/products/${req.file.filename}`;
    }
    const newProduct = await api.createProduct(product);
    res.json(newProduct);
  }

  async putProduct(req, res) {
    const id = req.params.id;
    const product = req.body;

    const updatedProduct = await api.updateProduct(id, product);
    res.json(updatedProduct);
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    const removedProduct = await api.deleteProduct(id);
    res.json(removedProduct);
  }
}

export default ControllerProducts;
