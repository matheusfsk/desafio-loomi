import { Response, Request } from "express";
import { prisma } from "../../database/prismaClient";

export class ProductDetailsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const productExists = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!productExists) {
      return res.status(404).json({
        message: "Error: Product not found.",
      });
    }
    const detail = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(detail);
  }
}

export default ProductDetailsController;
