import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";
const { deleteFile } = require("../../utils/storage");

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

      const productInOrder = await prisma.orderItem.findFirst({
        where: { product_id: Number(id) },
      });

      if (productInOrder) {
        return res.status(400).json({
          message:
            "This product is associated with existing orders and cannot be deleted.",
        });
      }

      const path = productExists.image?.slice(
        productExists.image?.indexOf("imagens")
      );

      if (productExists.image) {
        await deleteFile(path);
      }

      await prisma.product.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default DeleteProductController;
