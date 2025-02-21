import { Router } from "express";
import UserController from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchema";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const usersRouter = Router();
const UserControllers = new UserController();

usersRouter.get("/", AuthMiddleware.execute, UserControllers.index);
usersRouter.post("/", createUserSchema,  UserControllers.create);

export default usersRouter;
