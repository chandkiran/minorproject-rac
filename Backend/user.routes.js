const Router = require("express")
import express from "express"
import registerUser from "./user.controller.js"

const router = Router()

router.route("/signin").post(registerUser)

export default router