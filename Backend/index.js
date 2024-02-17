import connectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import "dotenv/config";

import express from "express";

import userRouter from "./user.routes.js";

import router from "./user.routes.js";
import ItemRouter from "./items.route.js";
import { app } from "./app1.js";
import { User } from "./user.model.js";
import { Item } from "./item_schema.js";
// const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Listening at port:", port);
  });
});

app.get("/", (req, res) => {
  res.send("Running");
});
app.get("/users/signin", (req, res) => {
  res.send("Running");
});

app.get("/users/verifyUID", (req, res) => {
  res.send("VERIFY UID");
});
app.get("/items/addTotal", (req, res) => {
  res.send("working");
});

// app.get("/users/getItems", (req, res) => {
//   res.send("okay");
// });

app.use("/users", userRouter);
app.use(router);

app.use("/items", ItemRouter);

// app.get("/items/updateQuantity",(req,res)=>{
//   res.send("hi")
// })

