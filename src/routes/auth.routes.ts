import { Router } from "express";
import {
  registerController,
  logInController,
  logOutController,
  getUserPreferencesController,
  updateUserPreferencesController,
  getMeController,
} from "../controllers/auth.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", logInController);
authRouter.post("/logout", logOutController);
authRouter.get("/preferences", isAuth, getUserPreferencesController);
authRouter.patch("/preferences", isAuth, updateUserPreferencesController);
authRouter.get("/me", isAuth, getMeController);

export default authRouter;
