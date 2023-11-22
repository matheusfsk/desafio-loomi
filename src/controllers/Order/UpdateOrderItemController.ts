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

export class UpdateOrderItemController {
  async handle(req: Request, res: Response) {
    const {
      order_items,
      userLogin: { id },
    }: { order_items: OrderItem[]; userLogin: { id: number } } = req.body;

    const { orderId } = req.params;

    try {
      const orderExists = await prisma.order.findUnique({
        where: { id: Number(orderId) },
      });
      if (!orderExists) {
        return res.status(404).json({
          message: "Erro: Order not found.",
        });
      }

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

        await transaction.order.update({
          where: { id: Number(orderId) },
          data: {
            user_id: id,
            total: 0,
            order_status: "received",
            updated_at: new Date(),
          },
        });

        for (const productOrder of order_items) {
          const { product_id, amount } = productOrder;

          const orderItem = await prisma.orderItem.findFirstOrThrow({
            where: { product_id: product_id, order_id: Number(orderId) },
            select: {
              id: true,
            },
          });

          const findPrice = await transaction.product.findUnique({
            where: { id: product_id },
            select: {
              price: true,
            },
          });

          const price = findPrice?.price ?? 0;
          productSubTotal = amount * Number(price);

          await transaction.orderItem.update({
            where: { id: orderItem.id, order_id: Number(orderId) },
            data: {
              amount,
              price,
              subtotal: productSubTotal,
            },
          });

          total += productSubTotal;
        }

        await transaction.order.update({
          where: { id: Number(orderId) },
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

export default UpdateOrderItemController;
