import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ // creation de la table
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
})

export const UserModel = mongoose.model("users", UserSchema) // users is the table name in database