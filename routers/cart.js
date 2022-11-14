import express from "express";
import ControllerCart from "../controllers/cart.js";

const controllerCart = new ControllerCart();

const router = express.Router();

router.post("/", controllerCart.displayProducts);

router.get("/", controllerCart.getCarts);

router.get("/:id", controllerCart.getCart);

router.post("/new", controllerCart.postCart);

router.put("/:id", controllerCart.putCart);

router.delete("/:id", controllerCart.deleteCart);

export default router;
