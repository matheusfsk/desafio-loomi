import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const productExists = await prisma.product.findFirst({
        where: { id: Number(id) },
      });

      if (!productExists) {
        return res.status(404).json({ message: "Product not found." });
      }

      await prisma.product.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}
export default DeleteProductController;
