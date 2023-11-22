import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class UserEmailConfirmController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const confirm = await prisma.user.update({
        where: { email: id },
        data: {
          email_confirmed: true,
        },
      });
      res.status(200).json(confirm);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserEmailConfirmController;
