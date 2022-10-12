import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import cors from 'cors'
import { DB_CONNECT } from "./utils/constants.js";

var app = express()

app.use(cors())

mongoose.connect(DB_CONNECT, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  },6000000)
  .then(console.log("connected to server"))
  .catch((err) => console.log(err));


const PORT=8080;
app.use(express.json())
app.use('/auth',authRoute);

app.listen(PORT,()=>{console.log("hello a^2");})

