import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";
const bcrypt = require("bcrypt");

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { id } = req.params;

    if (
      req.body.userLogin.id !== Number(id) &&
      req.body.userLogin.user_type !== "admin"
    ) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    try {
      const userExists = await prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (!userExists) {
        return res.status(404).json({ message: "User not found." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (email !== userExists.email) {
        const emailCustomerAlreadyExists = await prisma.user.findFirst({
          where: { email },
        });
        if (emailCustomerAlreadyExists) {
          return res.status(400).json({ message: "Email already exists." });
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          password: hashedPassword,
          updated_at: new Date(),
        },
      });

      return res.status(201).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default UpdateUserController;
