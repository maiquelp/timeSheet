import { Request, Response } from 'express';
import connection from '../database/connection';

export = {

    async update(req :Request, res: Response) {
        const settings = req.body;
     
        try {
            await connection('settings').update(settings);
      
            return res.json(settings);

        } catch (err) {
            return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
        }
    },

    async index(req: Request, res: Response) {
      
      try {
        const settings = await connection('settings').select('*');
        
        return res.json(settings);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }
}