import { Router } from 'express';
import taskController from '../controllers/taskController';


const tasksRouter = Router();

tasksRouter.post('/', taskController.create);

tasksRouter.get('/last', taskController.indexLast);

tasksRouter.delete('/delete', taskController.delete);

tasksRouter.get('/week', taskController.indexWeek);

tasksRouter.get('/month', taskController.indexMonth);

tasksRouter.get('/interval', taskController.indexDateInterval);


export default tasksRouter;