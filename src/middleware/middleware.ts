import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user";

const SECRET: any = process.env.JWT_SECRET;

export const authenticate = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization?.split(" ").at(-1);
  if (!token)
    return res.status(401).json({
      ok: false,
      status: "fail",
      message: "You need to login to access this resource",
    });
  const decoded: any = await jwt.verify(token, SECRET);
  console.log(decoded);
  const user = await User.findByPk(decoded.id);
  console.log("Authenticated user: ", user);
  if (!user)
    return res.status(401).json({
      ok: false,
      status: "fail",
      message: "You need to login to access this resource",
    });
  req.body.authenticatedUser = user;
  console.log("Authenticated user: ", user);
  next();
};
