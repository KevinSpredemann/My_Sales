import { Router } from 'express';
import ProductsControllers from '../controllers/ProductControllers';
import {
  createProductSchema,
  IdParamsValidation,
  updateProductSchema,
} from '../schemas/ProductSchemas';

const productsRouter = Router();
const ProductControllers = new ProductsControllers();

productsRouter.get('/', ProductControllers.index);
productsRouter.get('/:id', IdParamsValidation, ProductControllers.show);
productsRouter.post('/', createProductSchema, ProductControllers.create);
productsRouter.put('/:id', updateProductSchema, ProductControllers.update);
productsRouter.delete('/:id', IdParamsValidation, ProductControllers.delete);

export default productsRouter;
