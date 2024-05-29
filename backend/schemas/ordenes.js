import { Schema, SchemaType } from "mongoose";

export default new Schema({
  username: { type: String, require: true, index: true },
  amount: { type: Number, require: true },
  method: { type: String, require: true, default: "cash" },
  items: [
    {
      id: { type: Schema.Types.ObjectId },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});
