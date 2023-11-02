import express from "express"; // create a api mech
import cors from "cors"; // allowed communication between front & back
import mongoose from "mongoose" // for mongoDB 
import bodyParser from "body-parser"

import {imgsRouter} from './routes/images.js'
import {adminRouter} from './routes/admin.js'



const app = express()

app.use(express.json())
app.use(cors())



app.use("/images", imgsRouter)
app.use("/", adminRouter)


mongoose.connect(
    "mongodb+srv://Bascom3000:MeaculpaCHO17.@memoryapp.m8u9ftg.mongodb.net/memoryApp?retryWrites=true&w=majority"
    )

app.listen(8000, () => console.log("SERVER STARTED!"))