import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";
const { uploadFile } = require("../../utils/storage");

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  amount: number;
  category_id: number;
  image: string;
}

interface MulterRequest extends Request {
  file: any;
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
    const file = (req as MulterRequest).file;

    try {
      const categoryExists = await prisma.category.findFirst({
        where: { id: Number(category_id) },
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found." });
      }

      let fileImage = null;
      if (file) {
        fileImage = await uploadFile(
          `imagens/${file.originalname}`,
          file.buffer,
          file.mimetype
        );
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          amount: Number(amount),
          category_id: Number(category_id),
          image: fileImage.url,
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CreateProductController;
