const express = require('express');
const router = express.Router();
const likesController = require('./likesController');
const authUtil = require('../../middlewares/auth').verifyToken;

router.post('/likes',/*, authUtil*/ likesController.likes);

module.exports = router;