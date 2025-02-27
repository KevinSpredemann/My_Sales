import { Router } from "express";
import CostumerControllers from "../controller/CostumerControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { createCostumerSchema, idParamsValidate } from "../schema/CostumerSchema";

const costumersRouter = Router();
const costumersController = new CostumerControllers();

costumersRouter.use(AuthMiddleware.execute)
costumersRouter.get("/", costumersController.index);
costumersRouter.get("/:id", idParamsValidate, costumersController.show);
costumersRouter.post("/", createCostumerSchema, costumersController.create);
costumersRouter.patch("/:id", idParamsValidate, createCostumerSchema, costumersController.update);
costumersRouter.delete("/:id", idParamsValidate, costumersController.delete);

export default costumersRouter;
