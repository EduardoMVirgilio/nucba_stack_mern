import { Router } from "express";
import { add, browser, edit, read, remove } from "../controllers/productos.js";
const router = new Router();

router.get("/", browser);
router.get("/:id", read);
router.post("/", add);
router.put("/:id", edit);
router.delete("/:id", remove);

export default router;
