import express from "express"; // create a api mech
import cors from "cors"; // allowed communication between front & back
import mongoose from "mongoose" // for mongoDB 
import dotenv from 'dotenv';
import {imgsRouter} from './routes/images.js'
import {adminRouter} from './routes/admin.js'



dotenv.config();
const app = express()

app.use(express.json())
app.use(cors())



app.use("/images", imgsRouter)
app.use("/", adminRouter)

mongoose.connect(process.env.MONGODB_URI);


app.listen(8000, () => console.log("SERVER STARTED!"))