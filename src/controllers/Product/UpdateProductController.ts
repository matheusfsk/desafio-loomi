import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { name, description, price, amount, category_id } = req.body;
    const { id } = req.params;

    try {
      const productExists = await prisma.product.findFirst({
        where: { id: Number(id) },
      });

      if (!productExists) {
        return res.status(404).json({ message: "Product not found." });
      }

      const categoryExists = await prisma.category.findFirst({
        where: { id: Number(category_id) },
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found." });
      }

      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price,
          amount,
          category_id,
          updated_at: new Date(),
        },
      });

      return res.status(201).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default UpdateProductController;
