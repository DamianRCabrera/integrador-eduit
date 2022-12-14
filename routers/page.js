import express from "express";
import ControllerPage from "../controllers/page.js";

const controller = new ControllerPage();

const router = express.Router();

router.get("/inicio", controller.getInicio);

router.get("/:page", controller.checkPage);

router.get("/:invalid?", controller.invalidPage);

export default router;
