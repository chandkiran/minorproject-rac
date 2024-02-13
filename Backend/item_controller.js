// item.controller.js
import { Item } from "./item_schema.js";
import { Issued } from "./total_schem.js";
import mongoose from "mongoose";

export const getItems = async (req, res) => {
  const query = Item.find();

  query
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateQuantity = async (req, res) => {
  // const { itemID, quantity } = req.body;
  const updatedQuantities = req.body.data;

  try {
    // console.log("1st");

    for (const itemId in updatedQuantities) {
      const value = updatedQuantities[itemId];

      await Item.findOneAndUpdate({ item_id: itemId }, { quantity: value });
    }

    res.status(200).send("DONE");
  } catch (error) {
    res.status(500).json({ error: error.message, msg: "HELLO" });
  }
};

export const addTotal = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const foundItem = await Item.findOne({ item_id: itemId });

    if (!foundItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const issued = await Issued.create({
      _id: new mongoose.Types.ObjectId(),
      quantity: quantity,
      item: foundItem._id,
      user: userId,
    });

    res.status(201).json(200, issued, "Item issued successfully");
  } catch (error) {
    console.error("Error issuing item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
