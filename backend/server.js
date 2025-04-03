import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.port || 3000;
connectDB();

app.use(express.json())
app.use(cors({credentials:true}))
app.use(cookieParser())

app.get('/', (req,res) => {
    res.json("Api is working")
})
app.listen(port, () => 
    console.log(`Server is running successfully in ${port}`)
)