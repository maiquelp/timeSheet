const express = require('express');

const taskController = require('./controllers/taskController.js');

const routes = express.Router();

routes.post('/task', taskController.create);

module.exports = routes;