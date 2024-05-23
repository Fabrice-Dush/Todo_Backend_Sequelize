import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../database/models/user";
import bcrypt from "bcrypt";

const SECRET: any = process.env.JWT_SECRET;

const maxAge = 3 * 24 * 60 * 60;
// const maxAge = 5;
const generateToken = function (id: Number): String {
  const token = jwt.sign({ id }, SECRET, {
    expiresIn: maxAge,
  });

  return token;
};

export const login = async function (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("L Email or Password is incorrect");
    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) throw new Error("L Email or Password is incorrect");

    const token = generateToken(user.id);
    res.status(200).json({
      ok: true,
      status: "success",
      message: "You've succesfully logged in.",
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const signup = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordChangedAt: new Date(),
    };
    const newUser = await User.create(user);
    const token = generateToken(newUser.id);

    res.status(201).json({
      ok: true,
      status: "success",
      message: "Successfully created a new account",
      token,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Logged you out bruh");
    res.status(200).json({ ok: true, message: "success" });
  } catch (err) {
    res.status(500).json({ ok: false, message: "fail" });
  }
};

export const getUsers = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.findAll();
    res.status(200).json({
      ok: true,
      status: "success",
      message: "Got all users",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: "fail",
      message: "error getting users",
      errors: err,
    });
  }
};

export const updatePassword = async function (req: Request, res: Response) {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { id } = req.body.authenticatedUser;
    const updatedUser = await User.update(
      { password: hashedPassword, passwordChangedAt: new Date() },
      { where: { id } }
    );
    res.status(200).json({
      ok: true,
      status: "success",
      message: "User password updated successfully",
    });
  } catch (err: any) {
    res.status(500).json({ ok: false, status: "fail", message: err.message });
  }
};
