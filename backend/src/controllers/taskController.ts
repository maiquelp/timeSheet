import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';

const formatDate = (date: Date): string => {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d); 
}

const getSunday = (period: number) => {
  const sunday = new Date();
  sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % period);
  return formatDate(sunday);
}

const getSaturday = (period: number) => {
  const saturday = new Date();
  period === 7 ?
    saturday.setDate(saturday.getDate() - (saturday.getDay() + 7) % period) :
    saturday.setDate(saturday.getDate() + (saturday.getDay() + 7) % period);
  return formatDate(saturday);
}

const getFirstDay = (param: number) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + param;
  return formatDate(new Date(y, m, 1));
}

const getLastDay = (param: number) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + param;
  return formatDate(new Date(y, m + 1, 1));
}

const getNextDay = (param: string): string => {
  const date = new Date(param);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return formatDate(new Date(y, m, d + 2));
}

const tasksRepository = new TasksRepository();

export = {

    async create(req: Request, res: Response) {
        const {time} = req.body;
     
        try {
            tasksRepository.create(time);
      
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
        const response = await tasksRepository.indexWeek([getSunday(7), getSaturday(14), getSunday(14), getSaturday(7)]);
        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexMonth(req: Request, res: Response) {
      try {
        const response = await tasksRepository.indexMonth([getFirstDay(0), getLastDay(0), getFirstDay(-1), getLastDay(-1)]);

        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexDateInterval(req: Request, res: Response) {
      const interval = req.query;
      const from = String(interval.from);
      const to = getNextDay(String(interval.to));
      try {
        const response = await tasksRepository.indexInterval(from, to);

        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }
    
}