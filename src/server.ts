import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AunthenticatedMiddleware, login } from "./auth/auth";
import { UserAuthInfoRequest } from "./types/request";
import { tasks } from "./models/tasks";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.send({ message: "Hello World" });
});

app.get(
  "/task",
  AunthenticatedMiddleware,
  (request: UserAuthInfoRequest, response: Response) => {
    const data = tasks.filter((task) => task.user == request.user!.id);
    response.send(data);
  }
);

app.post("/login", login);

app.listen(process.env["PORT"]);
