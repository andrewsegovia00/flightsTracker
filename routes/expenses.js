const express = require('express');
const router = express.Router();
const expensesCtrl = require('../controllers/expenses');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/dashboard/:id/expenses', ensureLoggedIn, expensesCtrl.create);

// DELETE 
router.delete('/expenses/:id', ensureLoggedIn, expensesCtrl.delete);

// PUT 

router.put('/expenses/:id', ensureLoggedIn, expensesCtrl.updateExp);

module.exports = router;