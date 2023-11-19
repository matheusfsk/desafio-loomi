import { Router } from "express";
import IsAdmin from "../middlewares/IsAdmin";
import CreateProductController from "../controllers/Product/CreateProductController";
import ListProductsController from "../controllers/Product/ListProductsController";
import DeleteProductController from "../controllers/Product/DeleteProductController";
import UpdateProductController from "../controllers/Product/UpdateProductController";

const productRoutes = Router();

const isAdmin = new IsAdmin();

const createProduct = new CreateProductController();
const listProducts = new ListProductsController();
const deleteProduct = new DeleteProductController();
const updateProduct = new UpdateProductController();

productRoutes.post("/product", isAdmin.handle, createProduct.handle);
productRoutes.get("/product", listProducts.handle);
productRoutes.delete("/product/:id", isAdmin.handle, deleteProduct.handle);
productRoutes.put("/product/:id", isAdmin.handle, updateProduct.handle);

export { productRoutes };
