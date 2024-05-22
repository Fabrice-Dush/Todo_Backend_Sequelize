import express, { Request, Response } from "express";
import {
  createTodos,
  getTodo,
  editTodo,
  deleteTodo,
  markCompleted,
  getTodos,
  deleteTodos,
} from "./../controllers/todoController";
import { authenticate } from "./../middleware/middleware";
import Todo from "../database/models/todo";

const router = express.Router();

router.delete("/delete", async (req: Request, res: Response) => {
  await Todo.destroy({
    truncate: true,
  });

  res.status(200).json({
    ok: true,
    status: "success",
    message: "successfully deleted all todos",
  });
});

router
  .route("/")
  .get(authenticate, getTodos)
  .post(authenticate, createTodos)
  .delete(authenticate, deleteTodos);

router
  .route("/:id")
  .get(authenticate, getTodo)
  .put(authenticate, editTodo)
  .patch(authenticate, markCompleted)
  .delete(authenticate, deleteTodo);

export default router;
