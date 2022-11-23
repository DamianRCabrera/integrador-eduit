import express from "express";
import ControllerTable from "../controllers/table.js";

const controllerTable = new ControllerTable();

const router = express.Router();

router.get("/", controllerTable.displayTable);

export default router;
