import model from "../models/page.js";

async function getViews() {
  let allViews = await model.getNumFiles().then((files) => files);
  return allViews;
}

export default {
  getViews,
};
