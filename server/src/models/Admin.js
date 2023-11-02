import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({ // creation de la table
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export const AdminModel = mongoose.model("users", AdminSchema) // users is the table name in database