import Router from 'express';
import multer from 'multer';
import UserController from './app/controllers/user/UserController';
import SessionController from './app/controllers/session/SessionController';
import FileController from './app/controllers/files/FileController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import MeetupController from './app/controllers/meetup/MeetupController';
import OrganizerController from './app/controllers/meetup/OrganizerController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', SessionController.store);
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:userId', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/meetups/organizer', OrganizerController.index);

export default routes;
