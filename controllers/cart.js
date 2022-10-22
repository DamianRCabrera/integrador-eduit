import ApiProducts from "../api/products.js";

const apiProducts = new ApiProducts();

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
}

export default ControllerCart;
