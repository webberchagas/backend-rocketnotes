const { Router } = require('express');

const SessionsController = require('../controllers/SessionsControler');

const sessionsControler = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsControler.create);

module.exports = sessionsRoutes;
