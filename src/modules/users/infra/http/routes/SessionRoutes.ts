import { Router } from 'express';
import SessionsControllers from '../controllers/SessionsControllers';
import { sessionSchema } from '../schemas/SessionSchema';

const sessionRouter = Router();
const SessionsController = new SessionsControllers();

sessionRouter.post('/', sessionSchema, SessionsController.create);

export default sessionRouter;
