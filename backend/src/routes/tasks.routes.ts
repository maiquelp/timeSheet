import { Router } from 'express';
import TasksRepository from '../repositories/TasksRepository';
import IndexIntervalService from '../services/IndexIntervalService';
import IndexMonthService from '../services/IndexMonthService';
import IndexWeekService from '../services/IndexWeekService';

const tasksRepository = new TasksRepository();

const tasksRouter = Router();

tasksRouter.post('/', async (req, res) => {
  try {
    const {time} = req.body;
    tasksRepository.create({time});
    return res.status(204).send();

  } catch (err) {
      return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
  }
});

tasksRouter.get('/last', async (req, res) => {
  try {
    const lastTask = await tasksRepository.indexLast();
    return res.json(lastTask);

  } catch (err) {
    return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
  }
});

tasksRouter.delete('/delete', async (req, res) => {
  try {  
    tasksRepository.delete();
    return res.status(204).send();
      
  } catch (err) {
    return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
  }
});

tasksRouter.get('/week', async (req, res) => {
  try {
    const indexWeek = new IndexWeekService(tasksRepository);
    const response = await indexWeek.execute();
    return res.json(response);

  } catch (err) {
    return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
  }
});

tasksRouter.get('/month', async (req, res) => {
  try {
    const indexMonth = new IndexMonthService(tasksRepository);
    const response = await indexMonth.execute();
    return res.json(response);

  } catch (err) {
    return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
  }
});

tasksRouter.get('/interval', async (req, res) => {
  try {
    const request = req.query;
    const from = String(request.from);
    const to = String(request.to);
    const indexInterval = new IndexIntervalService(tasksRepository);
    const response = await indexInterval.execute({from, to});
    return res.json(response);

  } catch (err) {
    return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
  }
});

export default tasksRouter;