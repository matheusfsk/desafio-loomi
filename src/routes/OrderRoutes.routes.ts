import { Router } from "express";
import PaymentController from "./../controllers/Order/PaymentController";
import CreateOrderController from "../controllers/Order/CreateOrderController";
import IsAdmin from "../middlewares/IsAdmin";
import UpdateOrderItemController from "../controllers/Order/UpdateOrderItemController";
import DeleteOrderController from "../controllers/Order/DeleteOrderController";
import UpdateStatusOrderController from "../controllers/Order/UpdateStatusOrderController";
/* import ValidateRequestBody from "../middlewares/ValidateRequestBody";
import schemaOrder from "../validations/schemaOrder"; */

const orderRoutes = Router();

const isAdmin = new IsAdmin();

const createOrder = new CreateOrderController();
const updateOrderItem = new UpdateOrderItemController();
const deleteOrder = new DeleteOrderController();
const updateStatusOrder = new UpdateStatusOrderController();
const paymentController = new PaymentController();

orderRoutes.post("/orders", createOrder.handle);
orderRoutes.put("/orders/:orderId", updateOrderItem.handle);
orderRoutes.put("/payment/:orderId", isAdmin.handle, paymentController.handle);
orderRoutes.patch("/orders/:orderId", isAdmin.handle, updateStatusOrder.handle);
orderRoutes.delete("/orders/:orderId", isAdmin.handle, deleteOrder.handle);

export { orderRoutes };
