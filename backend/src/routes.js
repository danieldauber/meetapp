import Router from 'express';
import UserController from './app/controllers/user/UserController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'hello' });
});

routes.post('/users', UserController.store);

export default routes;
