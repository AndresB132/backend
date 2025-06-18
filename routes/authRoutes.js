const express = require('express');
const router = express.Router();
const { login, loginConGoogle } = require('../controllers/authController');
const { loginDTO } = require('../middlewares/loginDTO');

router.post('/api/login/google', loginConGoogle);
router.post('/api/login', loginDTO, login);

module.exports = router;
