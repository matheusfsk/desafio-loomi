import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const customerExists = await prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (!customerExists) {
        return res.status(404).json({ message: "User not found." });
      }

      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}
export default DeleteUserController;
