import { Request, Response } from 'express';
import connection from '../database/connection';
import Settings from '../models/Settings';
import SettingsRepository from '../repositories/SettingsRepository';

const settingsRepository = new SettingsRepository;

export = {
    async update(req :Request, res: Response) {
      const settings = new Settings(req.body.dollar, req.body.cost, req.body.discounts);
    
      try {
        await settingsRepository.update(settings);
        return res.json(settings);

      } catch (err) {
        return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
      }
    },

    async index(req: Request, res: Response) {
      
      try {
        const response = await settingsRepository.index();
        return res.json(response);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }
}