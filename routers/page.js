import express from "express";
import controller from "../controllers/page.js";

const router = express.Router();

router.get("/:page", controller.checkPage);

router.get("/:invalid?", controller.invalidPage);

export default router;
