const jwt = require("jsonwebtoken");
import { prisma } from "../database/prismaClient";
import { Request, Response, NextFunction } from "express";

const hash = process.env.PASSWORD_JWT;

export class LoginValidate {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    const token = authorization.replace("Bearer ", "").trim();

    if (token === "Bearer") {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    try {
      const { id } = jwt.verify(token, hash);

      const userExists = await prisma.user.findFirst({
        where: { id },
      });

      if (!userExists) {
        return res.status(404).json({ message: "User not found." });
      }

      const { password, ...userLogin } = userExists;

      req.body.userLogin = userLogin;

      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

export default LoginValidate;
