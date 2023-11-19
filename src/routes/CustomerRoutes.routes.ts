import { Router } from "express";
import IsAdmin from "../middlewares/IsAdmin";
import ListCustomersController from "../controllers/Customer/ListCustomersController";
import DeleteCustomerController from "../controllers/Customer/DeleteCustomerController";
import UpdateCustomerController from "../controllers/Customer/UpdateCustomerController";

const customerRoutes = Router();

const isAdmin = new IsAdmin();
const listCustomers = new ListCustomersController();
const deleteCustomer = new DeleteCustomerController();
const updateCustomer = new UpdateCustomerController();

customerRoutes.get("/customer", isAdmin.handle, listCustomers.handle);
customerRoutes.delete("/customer/:id", isAdmin.handle, deleteCustomer.handle);
customerRoutes.put("/customer/:id", updateCustomer.handle);

export { customerRoutes };
