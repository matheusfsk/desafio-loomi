import { Router } from "express";
import LoginController from "../controllers/Login/LoginController";
import UserEmailConfirmController from "../controllers/User/UserEmailConfirmController";

import schemaLogin from "../validations/schemaLogin";
import ValidateRequestBody from "../middlewares/ValidateRequestBody";

const loginRoutes = Router();

const login = new LoginController();
const userEmailConfirm = new UserEmailConfirmController();

loginRoutes.post("/login", ValidateRequestBody(schemaLogin), login.handle);

loginRoutes.get("/emailconfirmation/:id", userEmailConfirm.handle);

export { loginRoutes };
