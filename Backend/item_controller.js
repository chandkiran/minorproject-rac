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
    // Check if the item exists
    const foundItem = await Item.findOne({ item_id: itemId });

    if (!foundItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    let updatedQuantity;

    // Store the current quantity before any modifications
    const previousItemQuantity = foundItem.quantity;
    console.log(previousItemQuantity);

    // Check if there is an existing entry for the user and item
    const existingIssuedItem = await Issued.findOne({
      item_id: itemId,
      userID: userId,
    });

    if (existingIssuedItem) {
      // Update quantity if item is already issued
      updatedQuantity = existingIssuedItem.quantity + quantity;

      // Update the existing entry in the Issued database
      await Issued.findOneAndUpdate(
        { item_id: itemId, userID: userId },
        { quantity: updatedQuantity }
      );

      res.status(200).json({
        status: 200,
        message: "Item quantity updated successfully",
        updatedQuantity: updatedQuantity,
      });
    } else {
      // Create new database entry
      const issued = await Issued.create({
        _id: new mongoose.Types.ObjectId(),
        quantity: quantity,
        item_id: itemId,
        userID: userId,
      });

      // Initialize updatedQuantity with the newly issued quantity
      updatedQuantity = { quantity: quantity };

      res.status(200).json({
        status: 200,
        message: "Item issued successfully",
        issued: issued,
      });
    }

    // Set a timeout to perform cleanup and update after 2 minutes
    setTimeout(async () => {
      try {
        // Delete issued documents for the particular userId
        await Issued.deleteMany({
          userID: userId,
        });
        console.log(
          `Issued documents for userId ${userId} deleted after 2 minutes`
        );

        // Calculate the updated quantity for the Item collection
        const updatedItemQuantity =
          previousItemQuantity + updatedQuantity.quantity;
        console.log(updatedItemQuantity);

        // Update the Item database with the updated quantity
        await Item.findOneAndUpdate(
          { item_id: itemId },
          { quantity: updatedItemQuantity }
        );
        console.log("Item quantity updated after 2 minutes");
      } catch (error) {
        console.error(
          "Error deleting Issued documents or updating items:",
          error
        );
      }
    }, 2 * 60 * 1000); // Corrected the timeout to 2 minutes
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
    const { userID, itemID, quantity, action } = req.body;

    if (!userID || !itemID || !quantity) {
      return res
        .status(400)
        .json({ message: "userID, itemID, and quantity are required" });
    }

    if (action === "done") {
      

      await Issued.deleteMany({ userID, item_id: itemID, quantity: quantity });

      const newItem = await returnItem.create({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        item_id: itemID,
        quantity: quantity,
        issueDate: date,
      });

      return res.status(200).json(newItem);
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

export const see = async (req, res) => {
  const query = returnItem.find();

  query
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const invalid = async (req, res) => {
  const { userID, itemID, quantity } = req.body;
  console.log("hi");
  try {
    console.log("again");
    const foundItem = await Issued.findOne({ item_id: itemID });

    if (foundItem && foundItem.quantity === quantity) {
      // If quantity matches, create a new returnItem entry
      const newItem = await returnItem.create({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        item_id: itemID,
        quantity: quantity,
        issueDate:date
      });

      res.status(200).json({ message: "Correct quantity", newItem });
    } else {
      // If quantity doesn't match, update the Item collection
      // and create a returnItem entry with the returned quantity
      console.log();
      const updatedQuantity = foundItem ? foundItem.quantity - quantity : 0;
      console.log(updatedQuantity);

      await Item.findOneAndUpdate(
        { item_id: itemID },
        { $inc: { quantity: updatedQuantity } }
      );

      const newItem = await returnItem.create({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        item_id: itemID,
        quantity: quantity,
        issuedDate:date
      });

      res.status(200).json({ message: "Incorrect quantity", newItem });
    }
    await Issued.deleteOne({ item_id: itemID });
  } catch (error) {
    console.error("Error during invalid quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
};
function getDate() {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  return `${date}/${month}/${year} ${hour}:${minute}`;
}
const date = getDate();
