import ApiProducts from "../api/products.js";

const apiProducts = new ApiProducts();

class ControllerTable {
  async displayTable(req, res) {

    const products = await apiProducts.getProducts();

    res.render("partials/partials/table", { products, layout: false });
  }
}

export default ControllerTable;