import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';
import IndexIntervalService from '../services/IndexIntervalService';
import IndexMonthService from '../services/IndexMonthService';
import IndexWeekService from '../services/IndexWeekService';

const tasksRepository = new TasksRepository();

export = {

    async create(req: Request, res: Response) {
        const {time} = req.body;
     
        try {
            tasksRepository.create({time});
      
            return res.status(204).send();

        } catch (err) {
            return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
        }
    },

    async indexLast(req: Request, res: Response) {
      
      try {
        const lastTask = await tasksRepository.indexLast();
        
        return res.json(lastTask);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },
    
    async delete(req: Request, res: Response) {
      try {  
        tasksRepository.delete();

        return res.status(204).send();
          
      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexWeek(req: Request, res: Response) {
      try {
        const indexWeek = new IndexWeekService(tasksRepository);
        const response = await indexWeek.execute();
        
        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexMonth(req: Request, res: Response) {
      try {
        const indexMonth = new IndexMonthService(tasksRepository);
        const response = await indexMonth.execute();

        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexDateInterval(req: Request, res: Response) {
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
    } 
}