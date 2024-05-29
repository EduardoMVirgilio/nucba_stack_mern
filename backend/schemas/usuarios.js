import { Schema } from "mongoose";

export default new Schema({
  username: { type: String, require: true, index: true },
  password: { type: String, require: true, index: true },
  isAdmin: { type: Boolean, require: true, default: false },
  isActive: { type: Boolean, require: true, default: true },
});
