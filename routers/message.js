import express from "express";
import Controller from "../controllers/message.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

const controller = new Controller();

router.get("/", controller.getMessages);

router.get("/:id", controller.getMessage);

router.post("/", upload.fields([]), controller.postMessage);

router.put("/:id", controller.putMessage);

router.patch("/:id", controller.updateMessage);

router.delete("/:id", controller.deleteMessage);

export default router;
