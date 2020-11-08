import { Router } from 'express';

import tasksRouter from './tasks.routes';
import settingsRouter from './settings.routes';


const routes = Router();

routes.use('/tasks', tasksRouter);

routes.use('/settings', settingsRouter);


export default routes;