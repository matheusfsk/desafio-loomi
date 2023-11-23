import { ListOrdersController } from "./../controllers/Order/ListOrdersController";
import { Router } from "express";
import PaymentController from "./../controllers/Order/PaymentController";
import CreateOrderController from "../controllers/Order/CreateOrderController";
import IsAdmin from "../middlewares/IsAdmin";
import UpdateOrderItemController from "../controllers/Order/UpdateOrderItemController";
import DeleteOrderController from "../controllers/Order/DeleteOrderController";
import UpdateStatusOrderController from "../controllers/Order/UpdateStatusOrderController";
import ValidateRequestBody from "../middlewares/ValidateRequestBody";
import OrderDetailsController from "../controllers/Order/OrderDetailsController";
import schemaOrder from "../validations/schemaOrder";
import schemaUpdateStatus from "../validations/schemaUpdateStatus";
import schemaStatusPayment from "../validations/schemaStatusPayment";
const orderRoutes = Router();

const isAdmin = new IsAdmin();

const createOrder = new CreateOrderController();
const updateOrderItem = new UpdateOrderItemController();
const deleteOrder = new DeleteOrderController();
const updateStatusOrder = new UpdateStatusOrderController();
const paymentController = new PaymentController();
const listOrdersController = new ListOrdersController();
const orderDetailsController = new OrderDetailsController();
orderRoutes.post(
  "/orders",
  ValidateRequestBody(schemaOrder),
  createOrder.handle
);
orderRoutes.put(
  "/orders/:orderId",
  ValidateRequestBody(schemaOrder),
  updateOrderItem.handle
);

orderRoutes.put(
  "/payment/:orderId",
  ValidateRequestBody(schemaStatusPayment),
  isAdmin.handle,
  paymentController.handle
);

orderRoutes.patch(
  "/orders/:orderId",
  ValidateRequestBody(schemaUpdateStatus),
  isAdmin.handle,
  updateStatusOrder.handle
);
orderRoutes.delete("/orders/:orderId", isAdmin.handle, deleteOrder.handle);
orderRoutes.get("/orders", listOrdersController.handle);
orderRoutes.get("/orders/:orderId", orderDetailsController.handle);

export { orderRoutes };
