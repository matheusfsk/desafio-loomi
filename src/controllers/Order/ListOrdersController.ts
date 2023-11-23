import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const { startPeriod, endPeriod, user_id } = req.query;
    const {
      userLogin: { id, user_type },
    } = req.body;

    const filters: any = {};

    try {
      if (startPeriod && endPeriod) {
        filters.created_at = {
          gte: new Date(startPeriod as string),
          lte: new Date(endPeriod as string),
        };
      }

      if (user_id) {
        const userId = Number(user_id);

        if (!isNaN(userId)) {
          const userExists = await prisma.user.findFirst({
            where: { id: userId },
            select: { id: true },
          });

          if (userExists) {
            filters.user_id = userId;
          }
        }
      }

      if (user_type === "customer") {
        const userId = Number(id);

        if (!isNaN(userId)) {
          const userExists = await prisma.user.findFirst({
            where: { id: userId },
            select: { id: true },
          });

          if (userExists) {
            filters.user_id = userId;
          }
        }
      }

      const orderList = await prisma.order.findMany({
        where: filters,
      });

      if (orderList.length < 1) {
        return res
          .status(400)
          .json({ message: "No orders found with the specified filters." });
      }

      return res.status(200).json(orderList);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ListOrdersController;
