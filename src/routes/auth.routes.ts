import { Router } from "express";
import {
  registerController,
  logInController,
  logOutController,
} from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", logInController);
authRouter.post("/logout", logOutController);

export default authRouter;
