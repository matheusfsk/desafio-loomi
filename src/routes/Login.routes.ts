import { Router } from "express";
import LoginController from "../controllers/Login/LoginController";

const loginRoutes = Router();

const login = new LoginController();

loginRoutes.post("/login", login.handle);

export { loginRoutes };
