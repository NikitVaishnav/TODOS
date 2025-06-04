import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { register, login } from "./apimanager/ApiManage.js";
import {User} from "./schema/UserSchema.js"; 
import 
todoRoutes from "./routes/TodoRoutes.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

  
// Middleware
app.use(express.json());
app.use(cors());


// Create User (Sign Up)
app.post("/register", register);

app.post("/login", login);
app.use("/api", todoRoutes);
// app.post("/test",test);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
