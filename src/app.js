import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import cors from 'cors'
import dotenv from 'dotenv'
import protectedRoute from "./routes/protectedRoute.js";
import userMiddleware from "./middlewares/userMiddleware.js";

dotenv.config();

var app = express()

app.use(cors())

mongoose.connect(process.env.DB_CONNECT, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  },6000000)
  .then(console.log("connected to server"))
  .catch((err) => console.log(err));


app.use(express.json())
app.use('/auth',authRoute);
app.use('/user',userMiddleware , protectedRoute);
// app.use('/',(req,res)=>{res.send({hi:"hello"})})
app.listen(process.env.PORT||8080,()=>{console.log("hello a^2");})

