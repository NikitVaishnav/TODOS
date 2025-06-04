// schema/ToDoSchema.js
import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // good if you have a User model
    required: true  // ensures todos are tied to a user
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });   // adds createdAt and updatedAt automatically

export const ToDo = mongoose.model("ToDo", ToDoSchema);
