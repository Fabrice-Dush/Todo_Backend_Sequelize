import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user";

const SECRET: any = process.env.JWT_SECRET;

export const authenticate = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //? 1. Get token and check if it's there
    let token: any;
    if (req.headers.authorization?.startsWith("Bearer"))
      token = req.headers.authorization.split(" ").at(-1);

    if (!token) throw new Error("Login to get access to this resource");

    //? 2. Validate the token to see if it is correct or if it has not expired
    const decoded: any = await jwt.verify(token, SECRET);

    //? 3. Check if the user still exists
    const curUser = await User.findByPk(decoded.id);
    if (!curUser)
      throw new Error("User belonging to this token does not exist");

    //? 4. Check if the password has not been changed after the token was issued
    const jwtIssuedAt = decoded.iat;
    const passwordChangedAt = Math.round(
      curUser.passwordChangedAt.getTime() / 1000
    );

    if (passwordChangedAt > jwtIssuedAt)
      throw new Error(
        "Password was changed after the token was issued. Please login again to get a new token"
      );

    //? Grant access to the protected route
    req.body.authenticatedUser = curUser;
    next();
  } catch (err: any) {
    console.log(err);
    let message: string;
    if (err.name === "JsonWebTokenError") {
      message = "Invalid JWT token. Log in again to get a new one";
    } else if (err.name === "TokenExpiredError")
      message = "Expired JWT Token. Login again to get a new one";
    else message = err.message;
    res.status(401).json({ ok: false, status: "fail", message: message });
  }
};
