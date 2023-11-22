import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListUsersController {
  async handle(req: Request, res: Response) {
    const { name, email, id } = req.query;

    try {
      if (name) {
        const userFilteredByName = await prisma.user.findMany({
          where: {
            name: {
              contains: `${name}`,
              mode: "insensitive",
            },
          },
        });
        if (userFilteredByName.length === 0) {
          return res.status(400).json({
            message: "No users found.",
          });
        }
        return res.status(200).json(userFilteredByName);
      }
      if (email) {
        const userFilteredByEmail = await prisma.user.findFirst({
          where: { email: String(email) },
        });
        if (!userFilteredByEmail) {
          return res.status(400).json({
            message: "No users found within the specified email.",
          });
        }

        return res.status(200).json(userFilteredByEmail);
      }

      if (id) {
        const userFilteredById = await prisma.user.findUnique({
          where: { id: Number(id) },
        });
        if (!userFilteredById) {
          return res.status(400).json({
            message: "No users found within the specified ID.",
          });
        }
        return res.status(200).json(userFilteredById);
      }

      const userList = await prisma.user.findMany();
      return res.status(200).json(userList);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ListUsersController;
