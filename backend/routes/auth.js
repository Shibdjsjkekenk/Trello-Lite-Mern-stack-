const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { signup, login, getMe } = require('../controller/authController');
const { adminCreateUser } = require("../controller/authController");
const admin = require("../middleware/admin");

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);
router.post("/create-user", auth, admin, adminCreateUser);

module.exports = router;
