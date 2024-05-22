import { NextFunction, Request, Response } from "express";
import User from "../database/models/user";
import Todo from "../database/models/todo";

export const createTodos = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { text } = req.body;
    const user = req.body.authenticatedUser;
    const todo = {
      text,
      userId: user.id,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(todo);

    const newTodo = await Todo.create(todo);

    res.status(201).json({
      ok: true,
      status: "success",
      message: "Successfully created a new todo",
      data: newTodo,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "Unable to create todos",
      errors: err,
    });
  }
};

export const getTodo = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) throw new Error("Todo not found");
    res.status(200).json({
      ok: true,
      status: "success",
      message: "Successfully got a todo",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "Unable to get a todo",
      errors: err,
    });
  }
};

export const getTodos = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.body.authenticatedUser?.id },
    });
    res.status(200).json({
      ok: true,
      status: "success",
      message: "Successfully got all todos",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "Unable to get todos",
      errors: err,
    });
  }
};

export const editTodo = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { text: todoText } = req.body;

    const todo = await Todo.update(
      { text: todoText },
      { where: { id, userId: req.body.authenticatedUser?.id } }
    );

    res.status(200).json({
      ok: true,
      status: "success",
      message: "Successfully edited a todo",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "Unable to update a todo",
      errors: err,
    });
  }
};

export const markCompleted = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todo: any = await Todo.findByPk(req.params.id);

    const updatedTodo = await Todo.update(
      { completed: !todo.completed },
      { where: { id: todo.id, userId: req.body.authenticatedUser?.id } }
    );

    res.status(200).json({
      ok: true,
      status: "success",
      message: "Successfully updated a todo",
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "Unable to update a todo",
      errors: err,
    });
  }
};

export const deleteTodo = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await Todo.destroy({
      where: { id, userId: req.body.authenticatedUser?.id },
    });

    const todos = await Todo.findAll({
      where: { userId: req.body.authenticatedUser?.id },
    });

    res.status(200).json({
      ok: true,
      status: "success",
      message: "Successfully delete a todo",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "Unable to delete a todo",
      errors: err,
    });
  }
};

export const deleteTodos = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await Todo.destroy({
      where: { userId: req.body.authenticatedUser?.id },
    });

    const todos = await Todo.findAll({
      where: { userId: req.body.authenticatedUser?.id },
    });

    res.status(200).json({
      ok: true,
      status: "success",
      message: "Successfully deleted all todos",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: "fail", errors: err });
  }
};
