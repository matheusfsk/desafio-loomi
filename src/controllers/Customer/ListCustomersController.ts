import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class ListCustomersController {
  async handle(req: Request, res: Response) {
    const { name, email, id } = req.query;

    try {
      if (name) {
        const customerFilteredByName = await prisma.customer.findMany({
          where: {
            full_name: {
              contains: `${name}`,
              mode: "insensitive",
            },
          },
        });
        if (customerFilteredByName.length === 0) {
          return res.status(400).json({
            message: "No customers found.",
          });
        }
        return res.status(200).json(customerFilteredByName);
      }
      if (email) {
        const customerFilteredByEmail = await prisma.customer.findFirst({
          where: { email: String(email) },
        });
        if (!customerFilteredByEmail) {
          return res.status(400).json({
            message: "No customers found within the specified email.",
          });
        }

        return res.status(200).json(customerFilteredByEmail);
      }

      if (id) {
        const customerFilteredById = await prisma.customer.findUnique({
          where: { id: Number(id) },
        });
        if (!customerFilteredById) {
          return res.status(400).json({
            message: "No customers found within the specified ID.",
          });
        }
        return res.status(200).json(customerFilteredById);
      }

      const customerList = await prisma.customer.findMany();
      return res.status(200).json(customerList);
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}

export default ListCustomersController;
