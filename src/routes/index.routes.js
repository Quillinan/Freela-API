import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema, loginSchema } from "../schemas/users.schema.js";
import { usersController } from "../controllers/users.controller.js";
import servicesRouter from "./services.routes.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Get Samurai vive!!");
});

router.post("/signup", validateSchema(userSchema), usersController.signup);
router.post("/signin", validateSchema(loginSchema), usersController.signin);
router.post("/logout", validateToken(), usersController.logout);

router.use("/services", servicesRouter);

export default router;
