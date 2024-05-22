import todoRoutes from "./todoRoutes";
import userRoutes from "./userRoutes";
import express from "express";
const router = express.Router();

router.use("/todos", todoRoutes);
router.use("/users", userRoutes);

export default router;
