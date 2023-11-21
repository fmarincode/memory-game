import express from "express"; 
import cors from "cors"; 
import mongoose from "mongoose"  
import dotenv from 'dotenv';
import {imgsRouter} from './routes/images.js'
import {userRouter} from './routes/user.js'
import {themesRouter} from './routes/themes.js'

dotenv.config();

const corsOptions = {
    origin: "https://memocardgame.onrender.com", 
}

const app = express()

app.use(express.json({ limit: '10mb' })); 
app.use(cors(corsOptions));



app.use("/user", userRouter)
app.use("/images", imgsRouter)
app.use("/themes", themesRouter)


mongoose.connect(process.env.MONGODB_URI).then (() => {
    const PORT = process.env.PORT || 8001
    app.listen(PORT, () => console.log("SERVER STARTED!"))
    
}).catch(err => {console.error(err)});

app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});