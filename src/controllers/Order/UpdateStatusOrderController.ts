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

export class UpdateStatusOrderController {
  async handle(req: Request, res: Response) {
    const { order_status } = req.body;

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

      await prisma.order.update({
        where: { id: Number(orderId) },
        data: {
          order_status,
          updated_at: new Date(),
        },
      });

      return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UpdateStatusOrderController;
