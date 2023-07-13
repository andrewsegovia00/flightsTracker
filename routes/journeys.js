const express = require('express');
const router = express.Router();
const journeysCtrl = require('../controllers/journeys');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', journeysCtrl.index);
router.get('/new', ensureLoggedIn, journeysCtrl.new);
router.get('/:id', journeysCtrl.show);
router.post('/', ensureLoggedIn, journeysCtrl.create);

module.exports = router;