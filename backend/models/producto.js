import { model } from "mongoose";
import productos from "../schemas/productos.js";

export default model("producto", productos, "productos");
