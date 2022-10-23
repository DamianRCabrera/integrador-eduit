import express from "express";
import ControllerProducts from "../controllers/products.js";

const router = express.Router();
const controller = new ControllerProducts();

router.get("", async (req, res) => {
  const products = await controller.getProducts();
  res.json(products);
});

router.get("/product/:id", async (req, res) => {
  const product = await controller.getProductById(req.params.id);
  res.json(product);
});

export default router;
