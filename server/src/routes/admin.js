import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminModel } from "../models/Admin.js";



const router = express.Router()

router.post("/Adminregister", async(req, res) => {
    const {username, password} = req.body;

    const user = await AdminModel.findOne({username: username})

    if (user){
        return res.json({message: "User already exists !"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new AdminModel({username, password: hashedPassword})
    await newUser.save()

    res.json({message: "User Registered Successfully !"})
})

router.post("/Adminlogin", async(req, res) => {
    const {username, password} = req.body;

    const user = await AdminModel.findOne({username: username})

    if (!user){
        return res.json({message: "User doesn't exist !"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        return res.json({message: "Username or password is incorrect"})
    }

    const token = jwt.sign({id:user._id}, "secret")
    res.json({token, userID:user._id })
})


export {router as adminRouter};