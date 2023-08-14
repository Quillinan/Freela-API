import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { servicesController } from "../controllers/services.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { serviceSchema } from "../schemas/services.schema.js";

const servicesRouter = Router();

servicesRouter.post(
  "/",
  validateToken(),
  validateSchema(serviceSchema),
  servicesController.addService
);
servicesRouter.get(
  "/user:userId",
  validateToken(),
  servicesController.getUserServices
);
servicesRouter.get("/all", validateToken(), servicesController.getAllServices);
servicesRouter.get(
  "/:serviceId",
  validateToken(),
  servicesController.getOneService
);
servicesRouter.put(
  "/activate/:serviceId",
  validateToken(),
  servicesController.activateService
);
servicesRouter.put(
  "/deactivate/:serviceId",
  validateToken(),
  servicesController.deactivateService
);
servicesRouter.delete(
  "/:serviceId",
  validateToken(),
  servicesController.deleteService
);

export default servicesRouter;
