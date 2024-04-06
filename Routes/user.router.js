const express = require('express');
const user = require('../Controllers/user.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/user', user.getUser);

module.exports = router;
