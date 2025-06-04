import { ToDo } from "../schema/TodoSchema.js";
import jwt from "jsonwebtoken";

export const createTodo = async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const userId = req.user._id;
    const { title } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todo = new ToDo({
      title: title.trim(),
      userId, // ✅ matches your schema field
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Failed to create todo:", error);
    res.status(500).json({ message: "Failed to create todo", error });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const todos = await ToDo.find({ userId }).sort("-createdAt");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to get todos", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const todo = await ToDo.findOneAndUpdate(
      { _id: req.params.id, userId }, // ensure todo belongs to user
      req.body,
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const deleted = await ToDo.findOneAndDelete({ _id: req.params.id, userId });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};
