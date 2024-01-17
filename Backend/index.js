
import connectDB from './db.js';

import 'dotenv/config'

import express from 'express'



const app = express();
const port = process.env.PORT





connectDB().then(()=>{
  app.listen(port,()=>{
    console.log("Listening at port:",port)
  })
})

app.get("/",(req,res)=>{
  res.send("Running")
})


app.use("/users", userRouter)