import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve uploaded images
app.use('/images', express.static('images'));

// Routes
app.use("/api/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// Run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
