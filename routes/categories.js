const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../controllers/categories');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
router.get('/', categoriesCtrl.index);
// GET /movies/new
router.get('/new', ensureLoggedIn, categoriesCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', categoriesCtrl.show);
// POST /movies
router.post('/', ensureLoggedIn, categoriesCtrl.create);
	
module.exports = router;
