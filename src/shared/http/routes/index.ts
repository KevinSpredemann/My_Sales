import productsRoutes from "@modules/products/routes/ProductRoutes";
import { Router } from "express";

const routes = Router();

routes.get("/health", (req: any, res: any) => {
  return res.json({ message: "Hello Dev! I'm Alive" });
});

routes.use("/products", productsRoutes );


export default routes
