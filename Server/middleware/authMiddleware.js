import jwt from "jsonwebtoken";
import { User } from "../schema/UserSchema.js";

export const auth = async (req, res, next) => {
  console.log("Request headers:", req.headers);
  try {
    const authHeader = req.header("Authorization");
     console.log("Authorization Header:", authHeader);
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("TOKEN:", token);
    console.log("DECODED JWT payload::", decoded);

    const userId = decoded.userId || decoded.id || decoded._id;
   
    const user = await User.findById(decoded.userId);
     console.log("User from token:", user);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
     console.error("Authentication error:", error.message);
  res.status(401).send({ error: "Please authenticate" });
  }
};
