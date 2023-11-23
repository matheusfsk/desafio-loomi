import { Response, Request } from "express";
import { prisma } from "../../database/prismaClient";

export class CustomerDetailsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const customerExists = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
    if (!customerExists) {
      return res.status(404).json({
        message: "Error: Customer not found.",
      });
    }
    const detail = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(detail);
  }
}

export default CustomerDetailsController;
