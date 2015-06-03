var express = require('express');
var controller = require('../controllers/users');

var router = express.Router();

router.route('/')
	.get(controller.list)
	.post(controller.create);

router.route('/:id')
	.get(controller.getById);

module.exports = router;

