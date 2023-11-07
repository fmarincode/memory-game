import mongoose from "mongoose";

const themesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    media: {
        type: String,
        required: true,
    },
    userOwner: {
        type: String,
        required: true,
    },
    backImg: [
        {
            backImageName: {
                type: String,
            },
            backImage: {
                type: String,
            },
            backImageSrc: {
                type: String,
            },
            backImageAuthor: {
                type: String,
            }
        }
    ]
})

export const ThemeModel = mongoose.model("Themes", themesSchema) 


