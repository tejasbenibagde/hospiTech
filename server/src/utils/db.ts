import mongoose from "mongoose";

async function connectToDatabase(url: string | undefined) {
  if (!url) {
    console.error("No MongoDB connection URL provided");
    process.exit(1);
  }
  try {
    await mongoose.connect(url);
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

export default connectToDatabase;
