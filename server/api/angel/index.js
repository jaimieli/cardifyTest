'use strict';

var express = require('express');
var controller = require('./angel.controller');

var router = express.Router();

router.get('/getAngel/:id', controller.getAngel);
router.get('/getUser/:id', controller.getUser)
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;