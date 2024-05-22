import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { SequelizeConnection } from "./database/models/index";

import routes from "./routes/index";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT;

//? connect to database
SequelizeConnection.getInstance();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      status: "success",
      message: "Welcome here",
      data: [{ text: "Let's goooo" }],
    });
  } catch (err) {}
});

app.use("/api", routes);

// app.get("/api/todos", async (req: Request, res: Response) => {
//   try {
//     const todos = await Todo.findAll({
//       include: {
//         model: User,
//         as: "user",
//         attributes: ["id", "fullname", "email"],
//       },
//     });
//     res.status(200).json({
//       ok: true,
//       status: "success",
//       message: "Got all todos",
//       data: todos,
//     });
//   } catch (err) {
//     res.status(500).json({
//       ok: false,
//       status: "fail",
//       message: "error getting todos",
//       errors: err,
//     });
//   }
// });

app.use(async function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({ ok: false, status: "fail", message: err.message });
});

app.listen(PORT, () =>
  console.log(`Access this page on: http://localhost:${PORT}`)
);
