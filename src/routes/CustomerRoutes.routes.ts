import { Router } from "express";
import IsAdmin from "../middlewares/IsAdmin";
import ListCustomersController from "../controllers/Customer/ListCustomersController";
import DeleteCustomerController from "../controllers/Customer/DeleteCustomerController";
import UpdateCustomerController from "../controllers/Customer/UpdateCustomerController";
import ValidateRequestBody from "../middlewares/ValidateRequestBody";
import schemaCustomer from "../validations/schemaCustomer";

const customerRoutes = Router();

const isAdmin = new IsAdmin();
const listCustomers = new ListCustomersController();
const deleteCustomer = new DeleteCustomerController();
const updateCustomer = new UpdateCustomerController();

customerRoutes.get("/customers", isAdmin.handle, listCustomers.handle);
customerRoutes.delete("/customers/:id", isAdmin.handle, deleteCustomer.handle);
customerRoutes.put(
  "/customers/:id",
  ValidateRequestBody(schemaCustomer),
  updateCustomer.handle
);

export { customerRoutes };
