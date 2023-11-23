import { Response, Request } from "express";
import { prisma } from "../../database/prismaClient";

export class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.params;
    const { id, user_type } = req.body.userLogin;

    const orderExists = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });
    if (!orderExists) {
      return res.status(404).json({
        message: "Error: Order not found.",
      });
    }

    if (orderExists.user_id !== id && user_type === "customer") {
      return res.status(401).json({
        message:
          "This order you are trying to see is not yours, search for your order and try again",
      });
    }

    const detail = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });
    return res.status(200).json(detail);
  }
}

export default OrderDetailsController;
