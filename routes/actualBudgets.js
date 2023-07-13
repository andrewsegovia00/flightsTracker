const express = require('express');
const router = express.Router();
const actualBudgetsCtrl = require('../controllers/actualBudgets');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
router.get('/', acutalBudgetsCtrl.index);
// GET /movies/new
router.get('/new', ensureLoggedIn, acutalBudgetsCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', acutalBudgetsCtrl.show);
// POST /movies
router.post('/', ensureLoggedIn, acutalBudgetsCtrl.create);
	
module.exports = router;
