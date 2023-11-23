import { Router } from "express";
import IsAdmin from "../middlewares/IsAdmin";
import CreateProductController from "../controllers/Product/CreateProductController";
import ListProductsController from "../controllers/Product/ListProductsController";
import DeleteProductController from "../controllers/Product/DeleteProductController";
import UpdateProductController from "../controllers/Product/UpdateProductController";
import ProductDetailsController from "../controllers/Product/ProductDetailsController";
import ValidateRequestBody from "../middlewares/ValidateRequestBody";
import schemaProduct from "../validations/schemaProduct";
const multer = require("../connections/multer");

const productRoutes = Router();

const isAdmin = new IsAdmin();

const createProduct = new CreateProductController();
const listProducts = new ListProductsController();
const deleteProduct = new DeleteProductController();
const updateProduct = new UpdateProductController();
const productDetails = new ProductDetailsController();

productRoutes.post(
  "/products",
  isAdmin.handle,
  multer.single("image"),
  ValidateRequestBody(schemaProduct),

  createProduct.handle
);
productRoutes.get("/products", listProducts.handle);
productRoutes.get("/products/:id", isAdmin.handle, productDetails.handle);
productRoutes.delete("/products/:id", isAdmin.handle, deleteProduct.handle);
productRoutes.put(
  "/products/:id",
  ValidateRequestBody(schemaProduct),
  isAdmin.handle,
  updateProduct.handle
);

export { productRoutes };
