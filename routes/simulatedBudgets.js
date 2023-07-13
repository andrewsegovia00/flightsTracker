const express = require('express');
const router = express.Router();
const simulatedBudgetsCtrl = require('../controllers/simulatedBudgets');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
router.get('/', simulatedBudgetsCtrl.index);
// GET /movies/new
router.get('/new', ensureLoggedIn, simulatedBudgetsCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', simulatedBudgetsCtrl.show);
// POST /movies
router.post('/', ensureLoggedIn, simulatedBudgetsCtrl.create);
	
module.exports = router;
