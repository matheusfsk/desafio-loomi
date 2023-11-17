import { Router } from "express";
import CreateUserController from "../controllers/User/CreateUserController";
import CreateProductController from "../controllers/Product/CreateProductController";

const router = Router();

const createUser = new CreateUserController();
const createProduct = new CreateProductController();

router.post("/user", createUser.handle);
router.post("/product", createProduct.handle);

export { router };
