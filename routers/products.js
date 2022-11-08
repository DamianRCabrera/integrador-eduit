import express from "express";
import ControllerProducts from "../controllers/products.js";

const router = express.Router();
const controller = new ControllerProducts();

router.get("/", controller.getProducts);

router.get("/:id", controller.getProduct);

router.post("/", controller.postProduct)

router.put('/:id', controller.putProduct);

router.delete('/:id', controller.deleteProduct);

export default router;
