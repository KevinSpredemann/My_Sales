import productsRoutes from "@modules/products/routes/ProductRoutes";
import usersRouter from "@modules/users/routes/UserRoutes";
import userRoutes from "@modules/users/routes/UserRoutes";
import { Router } from "express";

const routes = Router();

routes.get("/health", (req: any, res: any) => {
  return res.json({ message: "Hello Dev! I'm Alive" });
});

routes.use("/products", productsRoutes);
routes.use("/users", usersRouter);


export default routes
