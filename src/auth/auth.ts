import { Request, Response } from "express";
import { users } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserAuthInfoRequest } from "../types/request";
dotenv.config();

export function login(request: Request, response: Response) {
  const user = users.filter((user) => {
    return (
      user.username == request.body.username &&
      user.password == request.body.password
    );
  })[0];
  if (user == null) {
    response.status(401).send({
      message: "Error on login",
    });
  }
  //console.log(user)
  const token = jwt.sign(user, process.env["ACCESS_SERVER_TOKEN"]!);
  //console.log(token);
  response.send({ token: token });
}

export function AunthenticatedMiddleware(
  req: UserAuthInfoRequest,
  res: Response,
  next: Function
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
  } else {
    jwt.verify(
      token,
      process.env["ACCESS_SERVER_TOKEN"]!,
      (error: unknown, user: any) => {
        if (error) {
          console.log(error);
          res.sendStatus(403);
        }
        req.user = user;
        next();
      }
    );
  }
}
