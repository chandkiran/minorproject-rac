import mongoose from "mongoose";


const returnSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item_id: { type: String },
  userID: { type: String },
  quantity: { type: Number, default: 1 },
  issueDate: { type: Date, default: Date.now(), required: true },
 
});

export const returnItem = mongoose.model("return", returnSchema);
