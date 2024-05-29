import { Schema } from "mongoose";

export default new Schema({
  name: { type: String, require: true, index: true },
  price: { type: Number, require: true },
  category: { type: String, require: true, default: "computadora" },
  stock: { type: Number, require: true, default: 10 },
});
