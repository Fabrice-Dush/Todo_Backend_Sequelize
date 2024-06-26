import express, { Request, Response } from "express";
const router = express.Router();

import {
  login,
  signup,
  logout,
  getUsers,
  updatePassword,
} from "./../controllers/userController";
import User from "../database/models/user";
import { authenticate } from "../middleware/middleware";

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
router.patch("/updatePassword", authenticate, updatePassword);

router.get("/logout", logout);

export default router;
