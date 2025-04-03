import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routers/userRouter.js";
import DisplayRouter from "./routers/DisplayRouter.js";

const app = express();
const port = process.env.port || 3000;
connectDB();

app.use(express.json())
app.use(cors({credentials:true}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.get('/', (req,res) => {
    res.json("Api is working")
})
app.use('/api/user',userRouter)
app.use('/api/display',DisplayRouter)
app.listen(port, () => 
    console.log(`Server is running successfully in ${port}`)
)