import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class UpdateCustomerController {
  async handle(req: Request, res: Response) {
    const { full_name, email, contact, address, status } = req.body;
    const { id } = req.params;

    if (
      req.body.userLogin.id !== Number(id) &&
      req.body.userLogin.user_type !== "admin"
    ) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    try {
      const customerExists = await prisma.customer.findFirst({
        where: { id: Number(id) },
      });

      if (!customerExists) {
        return res.status(404).json({ message: "Customer not found." });
      }

      if (email !== customerExists.email) {
        const emailCustomerAlreadyExists = await prisma.customer.findFirst({
          where: { email },
        });
        if (emailCustomerAlreadyExists) {
          return res.status(406).json({ message: "Email already exists." });
        }
      }

      const updatedCustomer = await prisma.customer.update({
        where: { id: Number(id) },
        data: {
          full_name,
          email,
          contact,
          address,
          status,
          updated_at: new Date(),
        },
      });

      return res.status(201).json(updatedCustomer);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default UpdateCustomerController;
