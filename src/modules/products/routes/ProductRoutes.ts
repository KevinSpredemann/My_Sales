import { Router } from 'express';
import ProductsControllers from '../database/controllers/ProductControllers';

const productsRouter = Router();
const ProductControllers = new ProductsControllers();

productsRouter.get('/', ProductControllers.index);
productsRouter.get('/:id', ProductControllers.show);
productsRouter.post('/', ProductControllers.create);
productsRouter.put('/:id', ProductControllers.update);
productsRouter.delete('/:id', ProductControllers.delete);

export default productsRouter;
