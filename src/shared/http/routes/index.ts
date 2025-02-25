import uploadConfig from "@config/upload";
import productsRoutes from "@modules/products/routes/ProductRoutes";
import avatarRouter from "@modules/users/routes/AvatarRoutes";
import passwordRouter from "@modules/users/routes/PasswordRoutes";
import sessionRouter from "@modules/users/routes/SessionRoutes";
import usersRouter from "@modules/users/routes/UserRoutes";
import express,{ Router } from "express";

const routes = Router();

routes.get("/health", (req: any, res: any) => {
  return res.json({ message: "Hello Dev! I'm Alive" });
});

routes.use("/products", productsRoutes);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/avatar", avatarRouter);
routes.use("/files", express.static(uploadConfig.directory));
routes.use("/password", passwordRouter);


export default routes
