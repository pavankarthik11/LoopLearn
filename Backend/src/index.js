import dotenv from "dotenv"
import connectDB from "./db/index.js";
// Remove this line: import express from "express"
import { app } from "./app.js";
import cron from 'node-cron';
import { User } from './models/user.model.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERR: ", error);
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })

    // (Removed scheduled cleanup for unverified users)
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})