import { Schema, SchemaType } from "mongoose";

export default new Schema({
  username: { type: String, require: true, index: true },
  amount: { type: Number, require: true },
  method: { type: String, require: true, default: "cash" },
  items: [
    {
      id: { type: Schema.Types.ObjectId, ref: "producto" },
      price: { type: Number, default: 1, min: 1 },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
});
