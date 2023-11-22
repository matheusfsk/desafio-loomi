import { Router } from "express";
import IsAdmin from "../middlewares/IsAdmin";
import CreateProductController from "../controllers/Product/CreateProductController";
import ListProductsController from "../controllers/Product/ListProductsController";
import DeleteProductController from "../controllers/Product/DeleteProductController";
import UpdateProductController from "../controllers/Product/UpdateProductController";
import ValidateRequestBody from "../middlewares/ValidateRequestBody";
import schemaProduct from "../validations/schemaProdutct";
const multer = require("../connections/multer");

const productRoutes = Router();

const isAdmin = new IsAdmin();

const createProduct = new CreateProductController();
const listProducts = new ListProductsController();
const deleteProduct = new DeleteProductController();
const updateProduct = new UpdateProductController();

productRoutes.post(
  "/products",
  isAdmin.handle,
  multer.single("image"),
  ValidateRequestBody(schemaProduct),

  createProduct.handle
);
productRoutes.get("/products", listProducts.handle);
productRoutes.delete("/products/:id", isAdmin.handle, deleteProduct.handle);
productRoutes.put(
  "/products/:id",
  ValidateRequestBody(schemaProduct),
  isAdmin.handle,
  updateProduct.handle
);

export { productRoutes };
