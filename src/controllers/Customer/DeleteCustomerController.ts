import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class DeleteCustomerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const customerExists = await prisma.customer.findFirst({
        where: { id: Number(id) },
      });

      if (!customerExists) {
        return res.status(404).json({ message: "Customer not found." });
      }

      await prisma.customer.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  }
}
export default DeleteCustomerController;
