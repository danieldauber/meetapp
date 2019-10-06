import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import MeetupController from './app/controllers/MeetupController';
import OrganizerController from './app/controllers/OrganizerController';
import SubscriptionController from './app/controllers/SubscriptionController';

import MeetupUpdateValidator from './app/validators/MeetupUpdate';
import MeetupStoreValidator from './app/validators/MeetupStore';
import SubscriptionStoreValidator from './app/validators/SubscriptionStore';
import SessionStoreValidator from './app/validators/SessionStore';
import UserStoreValidator from './app/validators/UserStore';
import UserUpdateValidator from './app/validators/UserUpdate';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_POST,
});

const bruteForce = new Brute(bruteStore);

routes.post(
  '/auth',
  bruteForce.prevent,
  SessionStoreValidator,
  SessionController.store
);
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserStoreValidator, UserController.store);
routes.put('/users/:userId', UserUpdateValidator, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupStoreValidator, MeetupController.store);
routes.put('/meetups/:id', MeetupUpdateValidator, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/meetups/organizer', OrganizerController.index);

routes.post(
  '/subscription',
  SubscriptionStoreValidator,
  SubscriptionController.store
);
routes.get('/subscription', SubscriptionController.index);

export default routes;
