import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";



const router = express.Router()

router.post("/userregister", async(req, res) => {
    const {username, password, role} = req.body;

    const user = await UserModel.findOne({username: username})

    if (user){
        return res.json({message: "User already exists !"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, password: hashedPassword, role})
    await newUser.save()

    res.json({message: "User Registered Successfully !"})
})

router.post("/userlogin", async(req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username: username})

    if (!user){
        return res.json({message: "User doesn't exist !"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        return res.json({message: "Username or password is incorrect"})
    }

    const token = jwt.sign({id:user._id}, "secret")
    res.json({token, userID:user._id, role:user.role, username: username })
})


export {router as userRouter};