import { model } from "mongoose";
import usuarios from "../schemas/usuarios.js";

export default model("usuario", usuarios, "usuarios");
