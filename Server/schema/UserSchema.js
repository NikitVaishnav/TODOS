import mongoose from "mongoose";


// Define User Schema
export const userSchema = new mongoose.Schema({
  password: String,
  name: String,
  email: String,
  phone : Number,
  dob : {
    type: Date,
    default: Date.now, // Optional: Automatically sets current date
  },
});
export const User = mongoose.model("demo", userSchema);
