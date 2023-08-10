import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const usersRouter = Router();

export default usersRouter;
