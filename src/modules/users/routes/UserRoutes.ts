import { Router } from "express";
import UserController from "../controllers/UserController";
import { createUserSchema } from "../schemas/UserSchema";

const usersRouter = Router();
const UserControllers = new UserController();

usersRouter.get("/", UserControllers.index);
usersRouter.post("/", createUserSchema,  UserControllers.create);

export default usersRouter;
