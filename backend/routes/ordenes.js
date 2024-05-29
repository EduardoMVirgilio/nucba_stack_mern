import { Router } from "express";
import { browser } from "../controllers/ordenes.js";
const router = new Router();

router.get("/", browser);

export default router;
