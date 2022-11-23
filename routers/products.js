import express from "express";
import ControllerProducts from "../controllers/products.js";
import upload from "../middlewares/multer.js";

const router = express.Router();
const controller = new ControllerProducts();

router.get("/", controller.getProducts);

router.get("/:id", controller.getProduct);

router.post("/", upload.single("image"), controller.postProduct);

router.post("/:id", upload.single("image"), controller.updateProduct);

router.put("/:id", controller.putProduct);

router.delete("/:id", controller.deleteProduct);

export default router;
