const { Router } = require('express');

const NotesController = require('../controllers/NotesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const notesController = new NotesController();

const notesRoutes = Router();

notesRoutes.use(ensureAuthenticated);

notesRoutes.get('/', notesController.index);
notesRoutes.post('/', notesController.create);
notesRoutes.get('/:note_id', notesController.show);
notesRoutes.delete('/:note_id', notesController.delete);

module.exports = notesRoutes;