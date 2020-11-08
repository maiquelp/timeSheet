import { Router } from 'express';
import settingsController from '../controllers/settingsController';


const settingsRouter = Router();

settingsRouter.get('/', settingsController.index);

settingsRouter.put('/', settingsController.update);

export default settingsRouter;