import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db";
import leadRoutes from "./routes/leadRoutes";
import projectRoutes from "./routes/projectRoutes";
import statsRoutes from "./routes/statsRoutes";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Professional request logging

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stats", statsRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Professional Server running on http://localhost:${PORT}`);
});
