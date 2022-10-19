import express from 'express';
import controller from '../controllers/products.js';

const router = express.Router();

router.get('', async (req, res) => {
  const products = await controller.getProducts();
  res.json(products);
});

export default router;