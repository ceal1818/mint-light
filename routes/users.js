var express = require('express');
var controller = require('../controllers/users');

var router = express.Router();

router.route('/')
	.get(controller.list);

router.route('/:id')
	.get(controller.getById);

module.exports = router;

