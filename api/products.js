import model from '../models/products.js';

const getProducts = async () => {
  const products = await model.readProducts();
  return products;
};

export default {
  getProducts
}