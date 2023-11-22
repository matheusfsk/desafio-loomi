import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.params;

    try {
      const orderExists = await prisma.order.findFirst({
        where: { id: Number(orderId) },
      });

      if (!orderExists) {
        return res.status(404).json({ message: "Order not found." });
      }
      const { order_status } = orderExists;
      if (order_status !== "received") {
        return res
          .status(404)
          .json({ message: " Order already confirmed cannot be deleted." });
      }

      await prisma.order.delete({
        where: { id: Number(orderId) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default DeleteOrderController;
