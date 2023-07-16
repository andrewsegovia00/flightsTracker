const express = require('express');
const router = express.Router();
const expensesCtrl = require('../controllers/expenses');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/dashboard/:id/expenses', ensureLoggedIn, expensesCtrl.create);

router.post('/dashboard/:id/expenses2', ensureLoggedIn, expensesCtrl.createCategory);

router.post('/dashboard/:id/expenses3', ensureLoggedIn, expensesCtrl.createCategory2);

// DELETE /reviews
router.delete('/expenses/:id', ensureLoggedIn, expensesCtrl.delete);

module.exports = router;