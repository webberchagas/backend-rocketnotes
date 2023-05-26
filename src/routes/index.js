const { Router } = require('express');

const userRoutes = require("./users.routes");
const notesRoutes = require('./notes.routes');
const tagRoutes = require('./tags.routes');
const sessionsRoutes = require('./sessions.routes');

const routes = Router();

routes.use("/users", userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use("/notes", notesRoutes);
routes.use('/tags', tagRoutes);

module.exports = routes;