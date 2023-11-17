import { Router } from "express";
import CreateUserController from "../controllers/User/CreateUserController";
import CreateProductController from "../controllers/Product/CreateProductController";
import ListProductsController from "../controllers/Product/ListProductsController";

const router = Router();

const createUser = new CreateUserController();
const createProduct = new CreateProductController();
const listProducts = new ListProductsController();
router.post("/user", createUser.handle);
router.post("/product", createProduct.handle);
router.get("/product", listProducts.handle);

export { router };
