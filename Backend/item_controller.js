// item.controller.js
import { Item } from "./item_schema.js";
import { returnItem } from "./return_schema.js";
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
    const foundItem = await Item.findOne({ item_id: itemId });

    if (!foundItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    const previousQuantity = foundItem.quantity + quantity;

    console.log("previousQuantity", previousQuantity);
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
        // Revert to its previous value
        await Issued.deleteMany({
          item_id: itemId,
          userID: userId,
        });
        console.log("Issued documents deleted after 2 minutes");
        // console.log(
        //   "updating item with itemid ",
        //   itemId,
        //   " with quantity ",
        //   previousQuantity,
        //   " after 2 minutes"
        // );
        await Item.findOneAndUpdate(
          { item_id: itemId },
          { quantity: previousQuantity }
        );
        console.log("items added");
      } catch (error) {
        console.error("Error deleting Issued documents:", error);
      }
    }, 30 * 60* 1000);
  } catch (error) {
    console.error("Error issuing item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const checked = async (req, res) => {
  const { userID } = req.body;

  try {
    const foundItems = await Issued.find({ userID: userID });

    if (!foundItems || foundItems.length === 0) {
      return res.status(404).json({
        message: "Items not found for the given userID",
      });
    }

    // Extracting only item_id and quantity from each found item
    const simplifiedItems = foundItems.map((item) => ({
      item_id: item.item_id,
      quantity: item.quantity,
    }));

    res.status(200).json(simplifiedItems);
  } catch (error) {
    console.error("Error during checking items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

export const taken = async (req, res) => {
  try {
    console.log("Received item:", req.body);

    const { userID, itemID, quantity } = req.body;

    if (!userID || !itemID || !quantity) {
      return res
        .status(400)
        .json({ message: "userID, itemID, and quantity are required" });
    }


    if (req.body.action === "done") {

      await Issued.deleteMany({ userID, item_id: itemID });

     
      const newItem = await returnItem.create({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        item_id: itemID,
        quantity: quantity,
        IssueDate:new Date(), 
    });

      return res.status(200).json(newItem)

  }
    // return res.status(200).json({
    //   message: "Received item information",
    //   userID: userID,
    //   itemID: itemID,
    //   quantity: quantity,
    // });
  } catch (error) {
    console.error("Error during processing taken request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const see=async(req,res) => {
  const query = returnItem.find();

  query
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

