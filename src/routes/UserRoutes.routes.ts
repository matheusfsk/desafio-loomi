import { Router } from "express";
import CreateUserController from "../controllers/User/CreateUserController";
import UserDetailsController from "../controllers/User/UserDetailsController";
import DeleteUserController from "../controllers/User/DeleteUserController";
import UpdateUserController from "../controllers/User/UpdateUserController";
import ListUsersController from "../controllers/User/ListUsersController";
import IsAdmin from "../middlewares/IsAdmin";

const userRoutes = Router();

const isAdmin = new IsAdmin();

const createUser = new CreateUserController();
const userDetails = new UserDetailsController();
const listUsers = new ListUsersController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();

userRoutes.post("/user", isAdmin.handle, createUser.handle);
userRoutes.get("/user", userDetails.handle);

userRoutes.get("/users", isAdmin.handle, listUsers.handle);
userRoutes.delete("/user/:id", isAdmin.handle, deleteUser.handle);
userRoutes.put("/user/:id", updateUser.handle);

export { userRoutes };
