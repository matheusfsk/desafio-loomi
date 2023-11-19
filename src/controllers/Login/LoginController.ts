import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { prisma } from "../../database/prismaClient";

const hash = process.env.PASSWORD_JWT;

export class LoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userLogin = await prisma.user.findUnique({ where: { email } });
      if (!userLogin) {
        return res.status(400).json({
          message: "Invalid login or password.",
        });
      }
      const correctPassword = await bcrypt.compare(
        password,
        userLogin.password
      );

      if (!correctPassword) {
        return res.status(400).json({
          message: "Invalid login or password.",
        });
      }

      const token = jwt.sign({ id: userLogin.id }, hash);

      const { password: _, ...userData } = userLogin;

      return res.status(200).json({
        userLogin: userData,
        token,
      });
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}

export default LoginController;
