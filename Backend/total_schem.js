import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  user: { type: String },
  quantity: { type: Number, default: 1 },
  issueDate: { type: Date, default: Date.now(), required: true },
  returnDate: {
    type: Date,
    default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});

export const Issued = mongoose.model("Issued", issueSchema);
