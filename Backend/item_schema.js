import mongoose, { Schema } from "mongoose";
// import {User} from "./user.model.js"
const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      unique: true,
      required: true,
    },
    item_id: {
      type: String,
      unique: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
