import { Response, Request } from "express";
import { prisma } from "../../database/prismaClient";

export class UserDetailsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userExists = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!userExists) {
      return res.status(404).json({
        message: "Error: User not found.",
      });
    }
    const detail = await prisma.user.findUnique({ where: { id: Number(id) } });
    return res.status(200).json(detail);
  }
}

export default UserDetailsController;
