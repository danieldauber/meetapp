import Router from 'express';
import UserController from './app/controllers/user/UserController';
import SessionController from './app/controllers/session/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', SessionController.store);
routes.use(authMiddleware);

routes.post('/users', UserController.store);

export default routes;
