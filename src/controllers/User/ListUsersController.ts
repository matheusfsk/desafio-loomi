import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListUsersController {
  async handle(req: Request, res: Response) {
    const { name, email, id } = req.query;
    const {
      userLogin: { id: loggedInUserId, user_type },
    } = req.body;

    const filters: any = {};

    try {
      if (name) {
        filters.name = {
          contains: `${name}`,
          mode: "insensitive",
        };
      }

      if (email) {
        filters.email = {
          startsWith: String(email),
          mode: "insensitive",
        };
      }

      if (id) {
        const userId = Number(id);

        if (!isNaN(userId)) {
          filters.id = userId;
        }
      }

      const userList = await prisma.user.findMany({
        where: filters,
      });

      if (userList.length === 0) {
        return res.status(404).json({
          message: "No users found with the specified criteria.",
        });
      }

      return res.status(200).json(userList);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ListUsersController;
