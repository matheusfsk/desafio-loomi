import { Router } from "express";
import CreateUserController from "../controllers/User/CreateUserController";
import CreateProductController from "../controllers/Product/CreateProductController";
import ListProductsController from "../controllers/Product/ListProductsController";
import DeleteProductController from "../controllers/Product/DeleteProductController";
import UpdateProductController from "../controllers/Product/UpdateProductController";
import ListCustomersController from "../controllers/Customer/ListCustomersController";
import DeleteCustomerController from "../controllers/Customer/DeleteCustomerController";
import UpdateCustomerController from "../controllers/Customer/UpdateCustomerController";

const router = Router();

const createUser = new CreateUserController();
const createProduct = new CreateProductController();
const listProducts = new ListProductsController();
const deleteProduct = new DeleteProductController();
const updateProduct = new UpdateProductController();

const listCustomers = new ListCustomersController();
const deleteCustomer = new DeleteCustomerController();
const updateCustomer = new UpdateCustomerController();

router.post("/user", createUser.handle);
router.post("/product", createProduct.handle);
router.get("/product", listProducts.handle);
router.delete("/product/:id", deleteProduct.handle);
router.put("/product/:id", updateProduct.handle);

router.get("/customer", listCustomers.handle);
router.delete("/customer/:id", deleteCustomer.handle);
router.put("/customer/:id", updateCustomer.handle);

export { router };
