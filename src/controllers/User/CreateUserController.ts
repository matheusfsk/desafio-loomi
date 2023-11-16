import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";
import { UserType } from "@prisma/client";
const bcrypt = require("bcrypt");

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  user_type: UserType;
}

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, user_type }: CreateUserRequest = req.body;

    try {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res.json({
          error: true,
          message: "Error: Email already exists.",
        });
      }

      const formattedName =
        name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: formattedName,
          email,
          password: hashedPassword,
          user_type,
        },
      });

      const { password: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}

export default CreateUserController;
