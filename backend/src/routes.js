const express = require('express');

const taskController = require('./controllers/taskController.js');

const routes = express.Router();

routes.post('/task', taskController.create);

routes.get('/latestTask', taskController.indexLatestTask);

routes.delete('/deleteTask', taskController.deleteTask);

routes.get('/weekTasks', taskController.indexWeekTasks);

routes.get('/weekMinutes', taskController.indexWeekMinutes);

routes.get('/weekReals', taskController.indexWeekReals);

routes.get('/week', taskController.indexWeek);

routes.get('/month', taskController.indexMonth);

module.exports = routes;