const express = require('express');
const router = express.Router();
const expensesCtrl = require('../controllers/expenses');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
// router.get('/', expensesCtrl.index);
// GET /movies/new
// router.get('/new', ensureLoggedIn, expensesCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
// router.get('/:id', expensesCtrl.show);
// POST /movies
// router.post('/', ensureLoggedIn, expensesCtrl.create);

// POST /movies/:id/reviews (create review for a movie)
router.post('/dashboard/:id/expenses', ensureLoggedIn, expensesCtrl.create);

router.post('/dashboard/:id/expenses2', ensureLoggedIn, expensesCtrl.createCategory);
// DELETE /reviews
router.delete('/expenses/:id', ensureLoggedIn, expensesCtrl.delete);

module.exports = router;