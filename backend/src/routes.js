const express = require('express');

const taskController = require('./controllers/taskController.js');

const routes = express.Router();

routes.post('/task', taskController.create);

routes.get('/lastTask', taskController.indexLast);

routes.delete('/deleteTask', taskController.delete);

routes.get('/week', taskController.indexWeek);

routes.get('/month', taskController.indexMonth);

module.exports = routes;