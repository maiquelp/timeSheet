const express = require('express');

const taskController = require('./controllers/taskController.js');

const settingsController = require('./controllers/settingsController.js');

const routes = express.Router();

routes.post('/task', taskController.create);

routes.get('/lastTask', taskController.indexLast);

routes.delete('/deleteTask', taskController.delete);

routes.get('/week', taskController.indexWeek);

routes.get('/month', taskController.indexMonth);

routes.get('/interval', taskController.indexDateInterval);

routes.get('/settings', settingsController.index);

routes.put('/updateSettings', settingsController.update);

module.exports = routes;