import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema } from "../schemas/users.schema.js";
import { usersController } from "../controllers/users.controller.js";
import { loginSchema } from "../schemas/login.schema.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Get Samurai vive!!");
});

router.post("/signup", validateSchema(userSchema), usersController.signup);
router.post("/signin", validateSchema(loginSchema), usersController.signin);

export default router;
