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
    const foundItem = await Item.findOne({ ivtem_id: itemId });

    if (!foundItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const issued = await Issued.create({
      _id: new mongoose.Types.ObjectId(),
      quantity: quantity,
      item_id: itemId,
      userID: userId,
    });
    res.status(200).json({
      status: 200,
      message: "Item issued successfully",
      issued: issued,
    });

    setTimeout(async () => {
      try {
        await Issued.deleteMany({
          item_id: itemId,
          userID: userId,
        });

        console.log("Issued documents deleted after 2 minutes");
      } catch (error) {
        console.error("Error deleting Issued documents:", error);
      }
    }, 5 * 60 * 1000);
  } catch (error) {
    console.error("Error issuing item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checked = async (req, res) => {
  const { userID } = req.body;
  console.log(userID);
  const foundItem = await Issued.findOne({ userID: userID });
  console.log(foundItem);
  if (!foundItem) {
    return res.status(404).json({
      message: "Item not found",
    });
  }
  res.status(200).json(foundItem);
};

export const verifyUID = async (req, res) => {
  try {
    console.log("Received Request:", req.body);
    const { userID } = req.body;

    if (!userID) {
      throw new ApiError(400, "UID is required");
    }

    const user = await Issued.findOne({ userID });

    if (!user) {
      res.status(404).send("incorrect");
      console.log("inc");
      return;
    }

    res.status(200).send("correct");
    console.log("correct");
  } catch (error) {
    console.error("Error during UID verification:", error);
    res.status(200).json({ message: "Internal server error" });
  }
};
