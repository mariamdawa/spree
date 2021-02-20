const path = require('path');

const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();
router.get('/login', loginController.getLoginPage);
router.get('/signup', loginController.getSignUp);
module.exports = router;