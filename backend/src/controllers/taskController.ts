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
      const currentWeekSunday = getSunday(7);
      const currentWeekSaturday = getSaturday(14);
      const pastWeekSunday = getSunday(14);
      const pastWeekSaturday = getSaturday(7);
      const weekData = {currentWeekSunday, currentWeekSaturday, pastWeekSunday, pastWeekSaturday};
      try {
        const response = await tasksRepository
          .indexWeek(weekData);
        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexMonth(req: Request, res: Response) {
      const currentMonthFirstDay = getFirstDay(0);
      const currentMonthLastDay = getLastDay(0);
      const pastMonthFirstDay = getFirstDay(-1);
      const pastMonthLastDay = getLastDay(-1);
      const monthData = {currentMonthFirstDay, currentMonthLastDay, pastMonthFirstDay, pastMonthLastDay};
      try {
        const response = await tasksRepository
          .indexMonth(monthData);

        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexDateInterval(req: Request, res: Response) {
      const request = req.query;
      const from = String(request.from);
      const to = getNextDay(String(request.to));
      const interval = {from, to}
      try {
        const response = await tasksRepository.indexInterval(interval);

        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }
    
}