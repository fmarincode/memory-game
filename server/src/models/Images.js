import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    titleFrom: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    userOwner: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    imageAuthor: {
        type: String,
        required: true,
    },
})

export const ImagesModel = mongoose.model("Images", imagesSchema) 


