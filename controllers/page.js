import ApiPage from "../api/page.js";
import ApiProducts from "../api/products.js";

const apiPage = new ApiPage();
const apiProducts = new ApiProducts();

class ControllerPage {
  async checkPage(req, res) {
    let allViews = await apiPage.getViews().then((files) => files);
    if (allViews.has(req.params.page)) {
      res.render(req.params.page, { title: req.params.page, layout: false });
    } else {
      res.render("404", { title: "Página no existe", layout: false });
    }
  }

  async getInicio(req, res) {
    const products = await apiProducts.getProducts();
    res.render("inicio", {
      title: "Juguetería Cósmica",
      products: products,
      layout: false,
    });
  }

  invalidPage(req, res) {
    let page = req.params.invalid;
    res.redirect(`/#/${page}`);
  }
}

export default ControllerPage;
