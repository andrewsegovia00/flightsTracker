const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../controllers/categories');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/dashboard/:id/expenses2', ensureLoggedIn, categoriesCtrl.createCategory);

router.post('/dashboard/:id/expenses3', ensureLoggedIn, categoriesCtrl.createCategory2);

console.log('you passed by here')

// DELETE 
router.delete('/categories/:id', ensureLoggedIn, categoriesCtrl.deleteSimCat);
router.delete('/abCategories', ensureLoggedIn, categoriesCtrl.deleteCat);

// PUT 
router.put('/categories/:id', ensureLoggedIn, categoriesCtrl.updateSimCat);

module.exports = router;