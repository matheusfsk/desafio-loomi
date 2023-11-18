import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  amount: number;
  category_id: number;
}

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      amount,
      category_id,
    }: CreateProductRequest = req.body;

    try {
      const categoryExists = await prisma.category.findFirst({
        where: { id: Number(category_id) },
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found." });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          amount,
          category_id,
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}

export default CreateProductController;
