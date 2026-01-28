import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.BOOKSTORE_URI);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
};
