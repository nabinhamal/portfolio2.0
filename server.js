import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import detailRoutes from "./routes/detailRoute.js"
import cors from "cors";
import bodyParser from "body-parser";
import qualificationRoutes from "./routes/qualificationRoute.js"
import projectRoutes from "./routes/projectRoute.js"

import contactRoutes from "./routes/contactRoute.js"

import path from 'path'
import {fileURLToPath} from 'url' 
// Configure env
dotenv.config();

// Database config
connectDB();

//es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./client/build')));


// Serve uploaded images
app.use('/images', express.static('images'));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/detail", detailRoutes);
app.use("/api/auth/qualification", qualificationRoutes);
app.use("/api/auth/project", projectRoutes);

app.use("/api/auth/contact",contactRoutes);

app.use("*",function(req,res){
res.sendFile(path.join(__dirname, "./client/build/index.html") )
})

// PORT
const PORT = process.env.PORT || 5000;

// Run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
