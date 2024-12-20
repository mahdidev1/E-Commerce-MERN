import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorizaton was not provided");
    return;
  }

  const tocken = authorizationHeader.split(" ")[1];

  if (!tocken) {
    res.status(403).send("bearer tocken not founded");
  }

  jwt.verify(tocken, process.env.JWT_SECRT || "", async (err, payload) => {
    if (err) {
      res.status(403).send("invalid tocken ");
      return;
    }
    if (!payload) {
      res.status(403).send("invalid tocken payload");
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};
export default validateJWT;
