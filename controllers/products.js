import api from '../api/products.js';

const getProducts = async () => {
  const products = await api.getProducts();
  return products;
}

export default {
  getProducts
};