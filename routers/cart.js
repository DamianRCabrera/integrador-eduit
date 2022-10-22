import express from "express";
import ControllerCart from "../controllers/cart.js";

const controllerCart = new ControllerCart();

const router = express.Router();

router.post("/", controllerCart.displayProducts);

export default router;
