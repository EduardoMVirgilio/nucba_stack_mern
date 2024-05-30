import { Router } from "express";
import { add, browser, edit, read, validate } from "../controllers/usuarios.js";
const router = new Router();

router.get("/", browser);
router.get("/:id", read);
router.post("/", add);
router.post("/validate", validate);
router.put("/:id", edit);

export default router;
