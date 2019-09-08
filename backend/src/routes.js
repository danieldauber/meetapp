import Router from 'express';
import multer from 'multer';
import UserController from './app/controllers/user/UserController';
import SessionController from './app/controllers/session/SessionController';
import FileController from './app/controllers/files/FileController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', SessionController.store);
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:userId', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
