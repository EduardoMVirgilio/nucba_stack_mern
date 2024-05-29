import { model } from "mongoose";
import ordenes from "../schemas/ordenes.js";

export default model("orden", ordenes, "ordenes");
