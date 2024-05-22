import express, { Request, Response } from "express";
const router = express.Router();

import {
  login,
  signup,
  logout,
  getUsers,
} from "./../controllers/userController";
import User from "../database/models/user";

router.get("/", getUsers);
router.delete("/", async (req: Request, res: Response) => {
  await User.destroy({
    truncate: true,
  });

  res.status(200).json({
    ok: true,
    status: "success",
    message: "successfully deleted all users",
  });
});
router.post("/login", login);
router.post("/signup", signup);

router.get("/logout", logout);

export default router;
