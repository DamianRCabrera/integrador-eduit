import express from "express";
import ControllerProducts from "../controllers/products.js";

const router = express.Router();
const controller = new ControllerProducts();

router.get("", async (req, res) => {
  console.log("intentando enroutar");
  const products = await controller.getProducts();
  res.json(products);
});

export default router;
