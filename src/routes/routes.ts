import { Router } from "express";
import { customerRoutes } from "./CustomerRoutes.routes";
import { loginRoutes } from "./Login.routes";
import { productRoutes } from "./ProductRoutes.routes";
import { userRoutes } from "./UserRoutes.routes";
import { LoginValidate } from "./../middlewares/LoginValidate";
const router = Router();

const loginValidate = new LoginValidate();

router.use(loginRoutes);

router.use(loginValidate.handle);
router.use(userRoutes);
router.use(customerRoutes);
router.use(productRoutes);

export { router };
