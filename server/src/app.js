import express from "express"
import apiRoute, { apiProtected } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
dotenv.config();


const app=express();




connectDB()
.then(()=>{
    app.use(express.json());
    app.use('/api/',apiRoute);
    app.use('/api/',AuthMiddleware,apiProtected);
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})


