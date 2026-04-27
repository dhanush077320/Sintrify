import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sintrify");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Error: ${error instanceof Error ? error.message : error}`);
    console.warn("⚠️ Continuing without DB connection... (Render 503 Prevention)");
  }
};

export default connectDB;
