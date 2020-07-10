const express = require('express');

const taskController = require('./controllers/taskController.js');

const routes = express.Router();

routes.post('/task', taskController.create);

routes.get('/taskTotal', taskController.indexTotal);

routes.get('/taskLatest', taskController.indexLatest);

module.exports = routes;