
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName,
    });

    isConnected = true;
    console.log(
      `MongoDB connected${mongoose.connection.name ? `: ${mongoose.connection.name}` : ""}`
    );

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      console.warn("MongoDB disconnected");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

