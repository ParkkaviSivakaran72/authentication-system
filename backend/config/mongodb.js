import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully!!");
    })
    await mongoose.connect(`${process.env.mongodbURL}/auth`);
}


export default connectDB;