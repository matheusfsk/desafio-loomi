import { Response, Request } from "express";
import { prisma } from "../../database/prismaClient";

export class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const orderExists = await prisma.order.findUnique({
      where: { id: Number(id) },
    });
    if (!orderExists) {
      return res.status(404).json({
        message: "Error: Order not found.",
      });
    }
    const detail = await prisma.order.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(detail);
  }
}

export default OrderDetailsController;
