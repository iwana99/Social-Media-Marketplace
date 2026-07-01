import { Router } from "express";
import { registerController,loginController,refreshController,logout } from "../controllers/auth.controller.js";


export const authRouter = Router();
const route = authRouter;

route.post("/register",registerController);
route.get("/login",loginController);
route.get("/refresh",refreshController);
route.post("/logout",logout);

