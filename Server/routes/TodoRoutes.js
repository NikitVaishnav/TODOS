// routes/TodoRoutes.js
import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../apimanager/TodoController.js";
import { auth } from "../middleware/authMiddleware.js";


const router = express.Router();
router.use(auth);

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
