import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

interface OrderItem {
  order_id: number;
  product_id: number;
  amount: number;
  price: number;
  subtotal: number;
}

interface Order {
  user_id: number;
  total: number;
}

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    const {
      order_items,
      userLogin: { id },
    } = req.body;

    try {
      const productIds = order_items.map(
        (item: { product_id: number }) => item.product_id
      );

      const productsInStock = await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        select: {
          id: true,
          amount: true,
          price: true,
        },
      });

      if (productsInStock.length !== productIds.length) {
        return res
          .status(400)
          .json({ message: "One or more products were not found." });
      }

      let i = 0;

      for (const product of productsInStock) {
        const { amount } = product;
        if (amount < order_items[i].amount) {
          return res
            .status(400)
            .json({ message: "Product not in sufficient stock." });
        }
        i++;
      }

      const insertOrder = await prisma.$transaction(async (transaction) => {
        let total = 0;
        let productSubTotal = 0;

        const order = await transaction.order.create({
          data: {
            user_id: id,
            total: 0,
            order_status: "received",
          },
          select: {
            id: true,
          },
        });

        for (const productOrder of order_items) {
          const { product_id, amount } = productOrder;

          const findPrice = await transaction.product.findUnique({
            where: { id: product_id },
            select: {
              price: true,
            },
          });

          const price = findPrice?.price ?? 0;
          productSubTotal = amount * Number(price);

          await transaction.orderItem.create({
            data: {
              order_id: order.id,
              product_id: product_id,
              amount,
              price,
              subtotal: productSubTotal,
            },
          });

          total += productSubTotal;
        }

        await transaction.order.update({
          where: { id: order.id },
          data: {
            total,
          },
        });
      });

      return res.status(201).json(insertOrder);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CreateOrderController;
