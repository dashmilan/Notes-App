


import mongoose from "mongoose";



const uri = "mongodb://localhost:27017/note_app";
export const connectLocalDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected ✅");
    } catch (err) {
        console.error("MongoDB connection error ❌", err);
        process.exit(1); // Exit if connection fails
    }
};