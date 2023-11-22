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

export class PaymentController {
  async handle(req: Request, res: Response) {
    const { payment } = req.body;
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
      const orderItems = await prisma.orderItem.findMany({
        where: { order_id: Number(orderId) },
        select: { product_id: true, amount: true },
      });

      let amountInStock = 0;

      if (payment === "confirm") {
        await prisma.order.update({
          where: { id: Number(orderId) },
          data: {
            order_status: "in_preparation",
            updated_at: new Date(),
          },
        });

        for (const product of orderItems) {
          const productInStock = await prisma.product.findUnique({
            where: { id: product.product_id },
            select: { amount: true },
          });

          amountInStock = Number(productInStock?.amount);
          await prisma.product.update({
            where: { id: product.product_id },
            data: {
              amount: amountInStock - product.amount,
            },
          });
        }

        return res.status(201).json({ message: "Payment confirmed." });
      }

      return res.status(201).json({ message: "Error on payment." });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default PaymentController;
