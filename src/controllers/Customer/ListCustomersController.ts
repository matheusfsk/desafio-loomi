import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListCustomersController {
  async handle(req: Request, res: Response) {
    const { name, email, id } = req.query;

    const filters: any = {};

    try {
      if (name) {
        filters.full_name = {
          contains: String(name),
          mode: "insensitive",
        };
      }

      if (email) {
        filters.email = {
          startsWith: String(email),
          mode: "insensitive",
        };
      }

      if (id) {
        const customerId = Number(id);

        if (!isNaN(customerId)) {
          filters.id = customerId;
        }
      }

      const customerList = await prisma.customer.findMany({
        where: filters,
      });

      if (customerList.length === 0) {
        return res.status(404).json({
          message: "No customers found with the specified filters.",
        });
      }

      if (id && customerList.length === 1) {
        return res.status(200).json(customerList[0]);
      }

      return res.status(200).json(customerList);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ListCustomersController;
