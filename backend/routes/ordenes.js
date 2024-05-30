import { Router } from "express";
import { add, browser, read, remove } from "../controllers/ordenes.js";
const router = new Router();

router.get("/", browser);
router.get("/:id", read);
router.post("/", add);
router.delete("/:id", remove);

export default router;
