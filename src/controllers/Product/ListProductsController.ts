import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const { name, price, amount, category_id } = req.query;

    try {
      if (name) {
        const productFilteredByName = await prisma.product.findMany({
          where: {
            name: {
              contains: `${name}`,
              mode: "insensitive",
            },
          },
        });
        return res.status(200).json(productFilteredByName);
      }

      if (price) {
        const priceRange = price.toString().split("-");

        if (priceRange.length !== 2) {
          return res
            .status(400)
            .json({ mensagem: "Invalid price range format." });
        }

        const minPrice = parseFloat(priceRange[0]);
        const maxPrice = parseFloat(priceRange[1]);

        if (
          isNaN(minPrice) ||
          isNaN(maxPrice) ||
          minPrice < 0 ||
          maxPrice < 0
        ) {
          return res
            .status(400)
            .json({ mensagem: "Invalid price range values." });
        }

        const productFilteredByPrice = await prisma.product.findMany({
          where: { price: { gte: minPrice, lte: maxPrice } },
        });

        if (productFilteredByPrice.length < 1) {
          return res.status(400).json({
            mensagem: "No products found within the specified price range.",
          });
        }

        return res.status(200).json(productFilteredByPrice);
      }

      if (amount) {
        const amountRange = amount.toString().split("-");

        if (amountRange.length !== 2) {
          return res
            .status(400)
            .json({ mensagem: "Invalid amount range format." });
        }

        const minAmount = parseInt(amountRange[0], 10);
        const maxAmount = parseInt(amountRange[1], 10);

        if (
          isNaN(minAmount) ||
          isNaN(maxAmount) ||
          minAmount < 0 ||
          maxAmount < 0
        ) {
          return res
            .status(400)
            .json({ mensagem: "Invalid amount range values." });
        }

        const productFilteredByAmount = await prisma.product.findMany({
          where: { amount: { gte: minAmount, lte: maxAmount } },
        });

        if (productFilteredByAmount.length < 1) {
          return res.status(400).json({
            mensagem: "No products found within the specified amount range.",
          });
        }

        return res.status(200).json(productFilteredByAmount);
      }

      if (category_id) {
        const categoryExists = await prisma.category.findFirst({
          where: { id: Number(category_id) },
          select: { id: true },
        });

        if (!categoryExists) {
          return res.status(400).json({ mensagem: "Category not found." });
        }

        const productFilteredByCategory = await prisma.product.findMany({
          where: { category_id: Number(category_id) },
        });

        if (productFilteredByCategory.length < 1) {
          return res.status(400).json({
            mensagem:
              "There are no products registered in the specified category.",
          });
        }
        return res.status(200).json(productFilteredByCategory);
      }
      const productList = await prisma.product.findMany();
      return res.status(200).json(productList);
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}

export default ListProductsController;
