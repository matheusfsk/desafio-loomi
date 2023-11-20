import { Router } from "express";
import LoginController from "../controllers/Login/LoginController";
import UserEmailConfirmController from "../controllers/User/UserEmailConfirmController";

const loginRoutes = Router();

const login = new LoginController();
const userEmailConfirm = new UserEmailConfirmController();

loginRoutes.post("/login", login.handle);

loginRoutes.get("/emailconfirmation/:id", userEmailConfirm.handle);

export { loginRoutes };
