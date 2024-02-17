// item.routes.js
import express from "express";
import {
  getItems,
  updateQuantity,
  addTotal,
  verifyUID,
  checked,
} from "./item_controller.js";

const ItemRouter = express.Router();

ItemRouter.route("/getItems").get(getItems);
ItemRouter.route("/updateQuantity").post(updateQuantity);
ItemRouter.route("/addTotal").post(addTotal);
ItemRouter.route("/checked").post(checked);
ItemRouter.route("/verifyUID").post(verifyUID);


export default ItemRouter;
