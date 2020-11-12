import { Router } from 'express';
import Settings from '../models/Settings';
import SettingsRepository from '../repositories/SettingsRepository';

const settingsRepository = new SettingsRepository;

const settingsRouter = Router();

settingsRouter.get('/', async (req, res) => {
  try {
    const response = await settingsRepository.index();
    return res.json(response);

  } catch (err) {
    return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
  }
});

settingsRouter.put('/', async (req, res) => {
  try {
    const { dollar, cost, discounts }= req.body;
    const settings = new Settings({dollar, cost, discounts});
    await settingsRepository.update(settings);
    return res.json(settings);

  } catch (err) {
    return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
  }
});

export default settingsRouter;