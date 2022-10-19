import api from '../api/page.js';

async function checkPage(req, res) {
  let allViews = await api.getViews().then((files) => files);

  if (allViews.has(req.params.page)) {
    res.render(req.params.page, { title: req.params.page, layout: false });
  } else {
    res.render("404", { title: "Página no existe", layout: false });
  }
}

function invalidPage(req, res) {
  let page = req.params.invalid;
  res.redirect(`/#/${page}`);
}

export default {
  checkPage,
  invalidPage
};