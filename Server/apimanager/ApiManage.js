import { User } from "../schema/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create new user with hashed password
    const updateduser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // await newUser.save();

    await updateduser.save();
    if (updateduser) {
      // Redirect after successful registration
      console.log("New user:", updateduser);

      return res.status(201).json({ success: true, user: updateduser });
    }
  } catch (error) {
    console.log("Error in backend:-", error);
  }
};

export const login = async (req, res) => {
  console.log("user:-", req.body);
  try {
    const { email, password } = req.body;

    //Check if email/password is present
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Compare password using bcrypt
     const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("User found in DB:", user);

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// No need for authentication middleware here
export const logout = async (req, res) => {
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};



// export const test = async
