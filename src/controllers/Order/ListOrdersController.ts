import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const { name, amount, price, category_id } = req.query;

    const filters: any = {};

    try {
      if (name) {
        filters.name = {
          contains: `${name}`,
          mode: "insensitive",
        };
      }

      if (price) {
        const priceRange = price.toString().split("-");

        if (priceRange.length === 2) {
          const minPrice = parseFloat(priceRange[0]);
          const maxPrice = parseFloat(priceRange[1]);

          if (
            !isNaN(minPrice) &&
            !isNaN(maxPrice) &&
            minPrice >= 0 &&
            maxPrice >= 0
          ) {
            filters.price = {
              gte: minPrice,
              lte: maxPrice,
            };
          }
        }
      }

      if (amount) {
        const amountRange = amount.toString().split("-");

        if (amountRange.length === 2) {
          const minAmount = parseInt(amountRange[0], 10);
          const maxAmount = parseInt(amountRange[1], 10);

          if (
            !isNaN(minAmount) &&
            !isNaN(maxAmount) &&
            minAmount >= 0 &&
            maxAmount >= 0
          ) {
            filters.amount = {
              gte: minAmount,
              lte: maxAmount,
            };
          }
        }
      }

      if (category_id) {
        const categoryId = Number(category_id);

        if (!isNaN(categoryId)) {
          const categoryExists = await prisma.category.findFirst({
            where: { id: categoryId },
            select: { id: true },
          });

          if (categoryExists) {
            filters.category_id = categoryId;
          }
        }
      }

      const productList = await prisma.product.findMany({
        where: filters,
      });

      if (productList.length < 1) {
        return res
          .status(400)
          .json({ message: "No products found with the specified filters." });
      }

      return res.status(200).json(productList);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ListOrdersController;
